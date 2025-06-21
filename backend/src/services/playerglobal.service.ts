import { DeleteResult, EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../config/orm";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { PAGINATION } from "../config/constants";
import { HttpError } from "../utils/httpError";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { PLAYERGLOBAL_MESSAGES, TEAMGLOBAL_MESSAGES } from "../utils/messages";
import { CountryService } from "./country.service";
import { generateUuid } from "../utils/uuid";
import { PlayerglobalEntity } from "../entities/playerglobal.entity";
import { CreatePlayerglobalDto } from "../dtos/createPlayerglobal.dto";
import { UpdatePlayerglobalDto } from "../dtos/updatePlayerglobal.dto";
import { PositionService } from "./position.service";
import { PlayerglobalPositionService } from "./playerglobalPosition.service";
import { TeamglobalService } from "./teamglobal.service";

export class PlayerglobalService {
  private readonly countryService: CountryService;
  private readonly positionService: PositionService;
  private _playerglobalPositionService?: PlayerglobalPositionService;
  private _teamglobalService?: TeamglobalService;

  constructor(
    private readonly playerglobalRepository: Repository<PlayerglobalEntity> = AppDataSource.getRepository(
      PlayerglobalEntity
    )
  ) {
    this.countryService = new CountryService();
    this.positionService = new PositionService();
  }

  private get playerglobalPositionService(): PlayerglobalPositionService {
    if (!this._playerglobalPositionService) {
      this._playerglobalPositionService = new PlayerglobalPositionService();
    }
    return this._playerglobalPositionService;
  }

  private get teamglobalService(): TeamglobalService {
    if (!this._teamglobalService) {
      this._teamglobalService = new TeamglobalService();
    }
    return this._teamglobalService;
  }

  async getPlayerglobals(
    page: number,
    limit: number,
    relationsOptions?: RelationsOptionsType
  ): Promise<PlayerglobalEntity[]> {
    const skip = (page - PAGINATION.INITIAL_PAGE) * limit;

    const playerglobals = await this.playerglobalRepository.find({
      // skip,
      // take: limit,
      relations: relationsOptions,
      order: { createdAt: "DESC" },
    });

    return playerglobals;
  }

  async getPlayerglobalById(
    playerglobalId: string,
    relationsOptions?: RelationsOptionsType,
    onlyWithoutTeamglobal?: boolean,
    entityManager?: EntityManager
  ): Promise<PlayerglobalEntity> {
    const repository = entityManager
      ? entityManager.getRepository(PlayerglobalEntity)
      : this.playerglobalRepository;

    if (onlyWithoutTeamglobal) {
      relationsOptions = {
        ...relationsOptions,
        teamglobal: true,
      };
    }

    const playerglobal = await repository.findOne({
      where: { id: playerglobalId },
      relations: relationsOptions,
    });

    if (!playerglobal) {
      throw new HttpError(
        HttpStatusEnum.NotFound,
        PLAYERGLOBAL_MESSAGES.ERROR.PLAYERGLOBAL_ID_NOT_FOUND(playerglobalId)
      );
    }

    if (onlyWithoutTeamglobal && playerglobal.teamglobal) {
      throw new HttpError(
        HttpStatusEnum.Conflict,
        PLAYERGLOBAL_MESSAGES.ERROR.PLAYERGLOBAL_WITH_TEAMGLOBAL(playerglobalId)
      );
    }

    return playerglobal;
  }

  async createPlayerglobal(
    createPlayerglobalDto: CreatePlayerglobalDto
  ): Promise<PlayerglobalEntity> {
    const commonPositionIds = [
      ...createPlayerglobalDto.primaryPositionIds,
    ].filter((positionId) =>
      createPlayerglobalDto.secondaryPositionIds.includes(positionId)
    );

    if (commonPositionIds.length > 0) {
      throw new HttpError(
        HttpStatusEnum.UnprocessableEntity,
        PLAYERGLOBAL_MESSAGES.ERROR.COMMON_POSITION_IDS(commonPositionIds)
      );
    }

    await this.countryService.getCountryById(createPlayerglobalDto.countryId);

    await Promise.all([
      ...createPlayerglobalDto.primaryPositionIds.map((positionId) =>
        this.positionService.getPositionById(positionId)
      ),
      ...createPlayerglobalDto.secondaryPositionIds.map((positionId) =>
        this.positionService.getPositionById(positionId)
      ),
    ]);

    return await AppDataSource.transaction(
      async (entityManager: EntityManager) => {
        const repository = entityManager.getRepository(PlayerglobalEntity);

        const savedPlayerglobal = await repository.save({
          ...createPlayerglobalDto,
          id: generateUuid(),
          imageUrl: createPlayerglobalDto.imageUrl
            ? createPlayerglobalDto.imageUrl
            : null,
        });

        for (const positionId of createPlayerglobalDto.primaryPositionIds) {
          await this.playerglobalPositionService.createPlayerglobalPosition(
            {
              playerglobalId: savedPlayerglobal.id,
              positionId: positionId,
              isPrimary: true,
            },
            entityManager
          );
        }

        for (const positionId of createPlayerglobalDto.secondaryPositionIds) {
          await this.playerglobalPositionService.createPlayerglobalPosition(
            {
              playerglobalId: savedPlayerglobal.id,
              positionId: positionId,
              isPrimary: false,
            },
            entityManager
          );
        }

        return savedPlayerglobal;
      }
    );
  }

  async updatePlayerglobal(
    updatePlayerglobalDto: UpdatePlayerglobalDto,
    playerglobalId: string
  ): Promise<PlayerglobalEntity> {
    const commonPositionIds = [
      ...updatePlayerglobalDto.primaryPositionIds,
    ].filter((positionId) =>
      updatePlayerglobalDto.secondaryPositionIds.includes(positionId)
    );

    if (commonPositionIds.length > 0) {
      throw new HttpError(
        HttpStatusEnum.UnprocessableEntity,
        PLAYERGLOBAL_MESSAGES.ERROR.COMMON_POSITION_IDS(commonPositionIds)
      );
    }

    const playerglobal = await this.getPlayerglobalById(playerglobalId);

    await this.countryService.getCountryById(updatePlayerglobalDto.countryId);

    await Promise.all([
      ...updatePlayerglobalDto.primaryPositionIds.map((positionId) =>
        this.positionService.getPositionById(positionId)
      ),
      ...updatePlayerglobalDto.secondaryPositionIds.map((positionId) =>
        this.positionService.getPositionById(positionId)
      ),
    ]);

    return await AppDataSource.transaction(
      async (entityManager: EntityManager) => {
        const repository = entityManager.getRepository(PlayerglobalEntity);

        const updatedPlayerglobal = await repository.save({
          ...playerglobal,
          ...updatePlayerglobalDto,
          imageUrl: updatePlayerglobalDto.imageUrl
            ? updatePlayerglobalDto.imageUrl
            : null,
        });

        await this.playerglobalPositionService.deletePlayerglobalPosition(
          updatedPlayerglobal.id,
          entityManager
        );

        for (const positionId of updatePlayerglobalDto.primaryPositionIds) {
          await this.playerglobalPositionService.createPlayerglobalPosition(
            {
              playerglobalId: updatedPlayerglobal.id,
              positionId: positionId,
              isPrimary: true,
            },
            entityManager
          );
        }

        for (const positionId of updatePlayerglobalDto.secondaryPositionIds) {
          await this.playerglobalPositionService.createPlayerglobalPosition(
            {
              playerglobalId: updatedPlayerglobal.id,
              positionId: positionId,
              isPrimary: false,
            },
            entityManager
          );
        }

        return updatedPlayerglobal;
      }
    );
  }

  async clearPlayerglobalTeamglobalId(
    playerglobalId?: string,
    allWithThisTeamglobalId?: string,
    entityManager?: EntityManager
  ): Promise<void> {
    const repository = entityManager
      ? entityManager.getRepository(PlayerglobalEntity)
      : this.playerglobalRepository;

    if (allWithThisTeamglobalId) {
      await this.teamglobalService.getTeamglobalById(
        allWithThisTeamglobalId,
        undefined,
        undefined,
        entityManager
      );

      const playerglobals = await repository.find({
        where: { teamglobalId: allWithThisTeamglobalId },
      });

      for (const playerglobal of playerglobals) {
        await this.updatePlayerglobalTeamglobalId(
          null,
          playerglobal.id,
          entityManager
        );
      }
    } else {
      if (!playerglobalId) {
        throw new HttpError(
          HttpStatusEnum.BadRequest,
          PLAYERGLOBAL_MESSAGES.ERROR.PLAYERGLOBAL_ID_IS_INVALID
        );
      }

      const playerglobal = await this.getPlayerglobalById(
        playerglobalId,
        undefined,
        undefined,
        entityManager
      );

      await repository.save({
        ...playerglobal,
        teamglobalId: null,
      });
    }
  }

  async updatePlayerglobalTeamglobalId(
    teamglobalId: string | null,
    playerglobalId: string,
    entityManager?: EntityManager
  ): Promise<void> {
    const repository = entityManager
      ? entityManager.getRepository(PlayerglobalEntity)
      : this.playerglobalRepository;

    const playerglobal = await this.getPlayerglobalById(
      playerglobalId,
      undefined,
      undefined,
      entityManager
    );

    if (teamglobalId) {
      await this.teamglobalService.getTeamglobalById(
        teamglobalId,
        undefined,
        undefined,
        entityManager
      );
    }

    await repository.save({
      ...playerglobal,
      teamglobalId: teamglobalId,
    });
  }

  async deletePlayerglobal(playerglobalId: string): Promise<DeleteResult> {
    await this.getPlayerglobalById(playerglobalId, undefined, true);

    return await this.playerglobalRepository.delete({ id: playerglobalId });
  }
}
