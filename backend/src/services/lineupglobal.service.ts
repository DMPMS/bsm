import { EntityManager, Repository } from "typeorm";
import { LineupglobalPlayerglobalService } from "./lineupglobalPlayerglobal.service";
import { PlayerglobalService } from "./playerglobal.service";
import { TeamglobalService } from "./teamglobal.service";
import { LineupglobalEntity } from "../entities/lineupglobal.entity";
import { AppDataSource } from "../config/orm";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { HttpError } from "../utils/httpError";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { LINEUPGLOBAL_MESSAGES } from "../utils/messages";
import { CreateLineupglobalDto } from "../dtos/createLineupglobal.dto";
import { generateUuid } from "../utils/uuid";
import { UpdateLineupglobalDto } from "../dtos/updateLineupglobal.dto";

export class LineupglobalService {
  private readonly playerglobalService: PlayerglobalService;
  private _lineupglobalPlayerglobalService?: LineupglobalPlayerglobalService;
  private _teamglobalService?: TeamglobalService;

  constructor(
    private readonly lineupglobalRepository: Repository<LineupglobalEntity> = AppDataSource.getRepository(
      LineupglobalEntity,
    ),
  ) {
    this.playerglobalService = new PlayerglobalService();
  }

  private get lineupglobalPlayerglobalService(): LineupglobalPlayerglobalService {
    if (!this._lineupglobalPlayerglobalService) {
      this._lineupglobalPlayerglobalService =
        new LineupglobalPlayerglobalService();
    }
    return this._lineupglobalPlayerglobalService;
  }

  private get teamglobalService(): TeamglobalService {
    if (!this._teamglobalService) {
      this._teamglobalService = new TeamglobalService();
    }
    return this._teamglobalService;
  }

  async getLineupglobalsByTeamglobalId(
    teamglobalId: string,
    relationsOptions?: RelationsOptionsType,
  ): Promise<LineupglobalEntity[]> {
    await this.teamglobalService.getTeamglobalById(
      teamglobalId,
      undefined,
      false,
    );

    const lineupglobals = await this.lineupglobalRepository.find({
      where: { teamglobalId: teamglobalId },
      relations: relationsOptions,
      order: { preset: "ASC" },
    });

    return lineupglobals;
  }

  async getLineupglobalById(
    lineupglobalId: string,
    relationsOptions?: RelationsOptionsType,
    entityManager?: EntityManager,
  ): Promise<LineupglobalEntity> {
    const repository = entityManager
      ? entityManager.getRepository(LineupglobalEntity)
      : this.lineupglobalRepository;

    const lineupglobal = await repository.findOne({
      where: { id: lineupglobalId },
      relations: relationsOptions,
    });

    if (!lineupglobal) {
      throw new HttpError(
        HttpStatusEnum.NotFound,
        LINEUPGLOBAL_MESSAGES.ERROR.LINEUPGLOBAL_ID_NOT_FOUND(lineupglobalId),
      );
    }

    return lineupglobal;
  }

  async createLineupglobal(
    createLineupglobalDto: CreateLineupglobalDto,
    entityManager?: EntityManager,
  ): Promise<LineupglobalEntity> {
    const repository = entityManager
      ? entityManager.getRepository(LineupglobalEntity)
      : this.lineupglobalRepository;

    await this.teamglobalService.getTeamglobalById(
      createLineupglobalDto.teamglobalId,
      undefined,
      false,
      entityManager,
    );

    await Promise.all([
      ...createLineupglobalDto.spotPlayerglobals.map((spot) =>
        this.playerglobalService.getPlayerglobalById(
          spot.playerId,
          undefined,
          undefined,
          entityManager,
        ),
      ),
    ]);

    const savedLineupglobal = await repository.save({
      id: generateUuid(),
      teamglobalId: createLineupglobalDto.teamglobalId,
      preset: createLineupglobalDto.preset,
      formation: createLineupglobalDto.formation,
      playStyle: createLineupglobalDto.playStyle,
      markingStyle: createLineupglobalDto.markingStyle,
      defenseLine: createLineupglobalDto.defenseLine,
      intensity: createLineupglobalDto.intensity,
    });

    for (const [
      index,
      spotPlayerglobal,
    ] of createLineupglobalDto.spotPlayerglobals.entries()) {
      await this.lineupglobalPlayerglobalService.createLineupglobalPlayerglobal(
        {
          lineupglobalId: savedLineupglobal.id,
          playerglobalId: spotPlayerglobal.playerId,
          spot: spotPlayerglobal.spot,
          isCaptain: index === 0,
          isFreeKickTaker: index === 0,
          isLeftCornerTaker: index === 0,
          isRightCornerTaker: index === 0,
        },
        entityManager,
      );
    }

    return savedLineupglobal;
  }

  async updateLineupglobal(
    updateLineupglobalDto: UpdateLineupglobalDto,
    lineupglobalId: string,
  ): Promise<LineupglobalEntity> {
    const lineupglobal = await this.getLineupglobalById(lineupglobalId);

    const playerglobalWithRoleIds = [
      updateLineupglobalDto.captainPlayerglobalId,
      updateLineupglobalDto.freeKickTakerPlayerglobalId,
      updateLineupglobalDto.leftCornerTakerPlayerglobalId,
      updateLineupglobalDto.rightCornerTakerPlayerglobalId,
    ];

    const invalidRolePlayerglobalIds = playerglobalWithRoleIds.filter(
      (playerglobalId) =>
        !updateLineupglobalDto.spotPlayerglobals.find(
          (spotPlayerglobal) => spotPlayerglobal.playerId === playerglobalId,
        ),
    );

    if (invalidRolePlayerglobalIds.length > 0) {
      const uniqueInvalidPlayerglobalIds = [
        ...new Set(invalidRolePlayerglobalIds),
      ];

      throw new HttpError(
        HttpStatusEnum.BadRequest,
        LINEUPGLOBAL_MESSAGES.ERROR.INVALID_ROLE_PLAYERGLOBAL_IDS(
          uniqueInvalidPlayerglobalIds,
        ),
      );
    }

    await Promise.all([
      ...updateLineupglobalDto.spotPlayerglobals.map(async (spot) => {
        const playerglobal = await this.playerglobalService.getPlayerglobalById(
          spot.playerId,
        );

        if (lineupglobal.teamglobalId !== playerglobal.teamglobalId) {
          throw new HttpError(
            HttpStatusEnum.Conflict,
            LINEUPGLOBAL_MESSAGES.ERROR.PLAYERGLOBAL_NOT_IN_TEAMGLOBAL(
              spot.playerId,
            ),
          );
        }
      }),
    ]);

    return await AppDataSource.transaction(
      async (entityManager: EntityManager) => {
        const repository = entityManager.getRepository(LineupglobalEntity);

        const updatedLineupglobal = await repository.save({
          id: lineupglobal.id,
          teamglobalId: lineupglobal.teamglobalId,
          preset: lineupglobal.preset,
          formation: updateLineupglobalDto.formation,
          playStyle: updateLineupglobalDto.playStyle,
          markingStyle: updateLineupglobalDto.markingStyle,
          defenseLine: updateLineupglobalDto.defenseLine,
          intensity: updateLineupglobalDto.intensity,
        });

        await this.lineupglobalPlayerglobalService.deleteLineupglobalPlayerglobal(
          updatedLineupglobal.id,
          entityManager,
        );

        for (const spotPlayerglobal of updateLineupglobalDto.spotPlayerglobals) {
          await this.lineupglobalPlayerglobalService.createLineupglobalPlayerglobal(
            {
              lineupglobalId: updatedLineupglobal.id,
              playerglobalId: spotPlayerglobal.playerId,
              spot: spotPlayerglobal.spot,
              isCaptain:
                spotPlayerglobal.playerId ===
                updateLineupglobalDto.captainPlayerglobalId,
              isFreeKickTaker:
                spotPlayerglobal.playerId ===
                updateLineupglobalDto.freeKickTakerPlayerglobalId,
              isLeftCornerTaker:
                spotPlayerglobal.playerId ===
                updateLineupglobalDto.leftCornerTakerPlayerglobalId,
              isRightCornerTaker:
                spotPlayerglobal.playerId ===
                updateLineupglobalDto.rightCornerTakerPlayerglobalId,
            },
            entityManager,
          );
        }

        return updatedLineupglobal;
      },
    );
  }
}
