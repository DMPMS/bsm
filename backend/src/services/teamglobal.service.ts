import { DeleteResult, EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../config/orm";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { PAGINATION } from "../config/constants";
import { HttpError } from "../utils/httpError";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { PLAYERGLOBAL_MESSAGES, TEAMGLOBAL_MESSAGES } from "../utils/messages";
import { CountryService } from "./country.service";
import { generateUuid } from "../utils/uuid";
import { TeamglobalEntity } from "../entities/teamglobal.entity";
import { CreateTeamglobalDto } from "../dtos/createTeamglobal.dto";
import { ManagerglobalService } from "./managerglobal.service";
import { UpdateTeamglobalDto } from "../dtos/updateTeamglobal.dto";
import { PlayerglobalService } from "./playerglobal.service";
import { LineupglobalService } from "./lineupglobal.service";
import { LineupPresetEnum } from "../enums/LineupPreset.enum";
import { LineupFormationEnum } from "../enums/LineupFormation.enum";
import { LineupPlayStyleEnum } from "../enums/LineupPlayStyle.enum";
import { LineupMarkingStyleEnum } from "../enums/LineupMarkingStyle.enum";
import { LineupDefenseLineEnum } from "../enums/LineupDefenseLine.enum";
import { LineupIntensityEnum } from "../enums/LineupIntensity.enum";
import { LineupSpotEnum } from "../enums/LineupSpot.enum";
import { UpdateActiveLineupglobalDto } from "../dtos/updateActiveLineupglobal.dto";
export class TeamglobalService {
  private readonly countryService: CountryService;
  private readonly managerglobalService: ManagerglobalService;
  private readonly playerglobalService: PlayerglobalService;
  private readonly lineupglobalService: LineupglobalService;

  constructor(
    private readonly teamglobalRepository: Repository<TeamglobalEntity> = AppDataSource.getRepository(
      TeamglobalEntity,
    ),
  ) {
    this.countryService = new CountryService();
    this.managerglobalService = new ManagerglobalService();
    this.playerglobalService = new PlayerglobalService();
    this.lineupglobalService = new LineupglobalService();
  }

  async getTeamglobals(
    page: number,
    limit: number,
    relationsOptions?: RelationsOptionsType,
  ): Promise<TeamglobalEntity[]> {
    const skip = (page - PAGINATION.INITIAL_PAGE) * limit;

    const teamglobals = await this.teamglobalRepository.find({
      // skip,
      // take: limit,
      relations: relationsOptions,
      order: { createdAt: "DESC" },
    });

    return teamglobals;
  }

  async getTeamglobalById(
    teamglobalId: string,
    relationsOptions?: RelationsOptionsType,
    onlyWithoutCompetitionglobal?: boolean,
    entityManager?: EntityManager,
  ): Promise<TeamglobalEntity> {
    const repository = entityManager
      ? entityManager.getRepository(TeamglobalEntity)
      : this.teamglobalRepository;

    if (onlyWithoutCompetitionglobal) {
      relationsOptions = {
        ...relationsOptions,
        competitionglobalTeamglobals: true,
      };
    }

    const teamglobal = await repository.findOne({
      where: { id: teamglobalId },
      relations: relationsOptions,
    });

    if (!teamglobal) {
      throw new HttpError(
        HttpStatusEnum.NotFound,
        TEAMGLOBAL_MESSAGES.ERROR.TEAMGLOBAL_ID_NOT_FOUND(teamglobalId),
      );
    }

    if (
      onlyWithoutCompetitionglobal &&
      teamglobal.competitionglobalTeamglobals &&
      teamglobal.competitionglobalTeamglobals.length > 0
    ) {
      throw new HttpError(
        HttpStatusEnum.Conflict,
        TEAMGLOBAL_MESSAGES.ERROR.TEAMGLOBAL_WITH_COMPETITIONGLOBAL(
          teamglobalId,
        ),
      );
    }

    return teamglobal;
  }

  async createTeamglobal(
    createTeamglobalDto: CreateTeamglobalDto,
  ): Promise<TeamglobalEntity> {
    await this.countryService.getCountryById(createTeamglobalDto.countryId);
    await this.managerglobalService.getManagerglobalById(
      createTeamglobalDto.managerglobalId,
      undefined,
      true,
    );

    await Promise.all(
      createTeamglobalDto.playerglobalIds.map((playerglobalId) =>
        this.playerglobalService.getPlayerglobalById(
          playerglobalId,
          undefined,
          true,
        ),
      ),
    );

    return await AppDataSource.transaction(
      async (entityManager: EntityManager) => {
        const repository = entityManager.getRepository(TeamglobalEntity);

        const savedTeamglobal = await repository.save({
          id: generateUuid(),
          countryId: createTeamglobalDto.countryId,
          managerglobalId: createTeamglobalDto.managerglobalId,
          activeLineupglobalPreset: LineupPresetEnum.Alpha,
          name: createTeamglobalDto.name,
          abbreviation: createTeamglobalDto.abbreviation.toUpperCase(),
          imageUrl: createTeamglobalDto.imageUrl
            ? createTeamglobalDto.imageUrl
            : null,
        });

        for (const playerglobalId of createTeamglobalDto.playerglobalIds) {
          await this.playerglobalService.updatePlayerglobalTeamglobalId(
            savedTeamglobal.id,
            playerglobalId,
            entityManager,
          );
        }

        const createLineupData = (preset: LineupPresetEnum) => ({
          teamglobalId: savedTeamglobal.id,
          preset: preset,
          formation: LineupFormationEnum.F433,
          playStyle: LineupPlayStyleEnum.Balanced,
          markingStyle: LineupMarkingStyleEnum.Zonal,
          defenseLine: LineupDefenseLineEnum.Medium,
          intensity: LineupIntensityEnum.Medium,
          spotPlayerglobals: Object.values(LineupSpotEnum)
            .filter((value): value is number => typeof value === "number")
            .map((spot, index) => ({
              spot: spot,
              playerId: createTeamglobalDto.playerglobalIds[index],
            })),
        });

        await Promise.all(
          Object.values(LineupPresetEnum)
            .filter((value): value is number => typeof value === "number")
            .map(async (preset) => {
              await this.lineupglobalService.createLineupglobal(
                createLineupData(preset),
                entityManager,
              );
            }),
        );

        return savedTeamglobal;
      },
    );
  }

  async updateTeamglobal(
    updateTeamglobalDto: UpdateTeamglobalDto,
    teamglobalId: string,
  ): Promise<TeamglobalEntity> {
    const teamglobal = await this.getTeamglobalById(teamglobalId, {
      lineupglobals: {
        lineupglobalPlayerglobals: true,
      },
    });

    const lineupglobalsAllPlayerglobalIds = Array.from(
      new Set(
        teamglobal
          .lineupglobals!.flatMap(
            (lineupglobal) => lineupglobal.lineupglobalPlayerglobals!,
          )
          .map(
            (lineupglobalPlayerglobal) =>
              lineupglobalPlayerglobal.playerglobalId,
          ),
      ),
    );

    const allLineupglobalPlayerglobalsRemain =
      lineupglobalsAllPlayerglobalIds.every((playerglobalId) =>
        updateTeamglobalDto.playerglobalIds.includes(playerglobalId),
      );

    if (!allLineupglobalPlayerglobalsRemain) {
      const removedPlayerglobalIds = lineupglobalsAllPlayerglobalIds.filter(
        (playerglobalId) =>
          !updateTeamglobalDto.playerglobalIds.includes(playerglobalId),
      );

      throw new HttpError(
        HttpStatusEnum.UnprocessableEntity,
        TEAMGLOBAL_MESSAGES.ERROR.ALL_LINEUPGLOBALS_PLAYERGLOBALS_MUST_REMAIN(
          removedPlayerglobalIds,
        ),
      );
    }

    await this.countryService.getCountryById(updateTeamglobalDto.countryId);

    if (updateTeamglobalDto.managerglobalId !== teamglobal.managerglobalId) {
      await this.managerglobalService.getManagerglobalById(
        updateTeamglobalDto.managerglobalId,
        undefined,
        true,
      );
    }

    await Promise.all(
      updateTeamglobalDto.playerglobalIds.map(async (playerglobalId) => {
        const playerglobal =
          await this.playerglobalService.getPlayerglobalById(playerglobalId);

        if (
          playerglobal.teamglobalId &&
          playerglobal.teamglobalId !== teamglobal.id
        ) {
          throw new HttpError(
            HttpStatusEnum.Conflict,
            PLAYERGLOBAL_MESSAGES.ERROR.PLAYERGLOBAL_WITH_TEAMGLOBAL(
              playerglobalId,
            ),
          );
        }
      }),
    );

    return await AppDataSource.transaction(
      async (entityManager: EntityManager) => {
        const repository = entityManager.getRepository(TeamglobalEntity);

        const updatedTeamglobal = await repository.save({
          id: teamglobal.id,
          countryId: updateTeamglobalDto.countryId,
          managerglobalId: updateTeamglobalDto.managerglobalId,
          activeLineupglobalPreset: teamglobal.activeLineupglobalPreset,
          name: updateTeamglobalDto.name,
          abbreviation: updateTeamglobalDto.abbreviation.toUpperCase(),
          imageUrl: updateTeamglobalDto.imageUrl
            ? updateTeamglobalDto.imageUrl
            : null,
        });

        await this.playerglobalService.clearPlayerglobalTeamglobalId(
          undefined,
          updatedTeamglobal.id,
          entityManager,
        );

        for (const playerglobalId of updateTeamglobalDto.playerglobalIds) {
          await this.playerglobalService.updatePlayerglobalTeamglobalId(
            updatedTeamglobal.id,
            playerglobalId,
            entityManager,
          );
        }

        return updatedTeamglobal;
      },
    );
  }

  async updateActiveLineupglobal(
    updateActiveLineupglobalDto: UpdateActiveLineupglobalDto,
    teamglobalId: string,
  ): Promise<TeamglobalEntity> {
    const teamglobal = await this.getTeamglobalById(teamglobalId);

    const updatedTeamglobal = await this.teamglobalRepository.save({
      activeLineupglobalPreset: updateActiveLineupglobalDto.lineupglobalPreset,

      id: teamglobal.id,
      countryId: teamglobal.countryId,
      managerglobalId: teamglobal.managerglobalId,
      name: teamglobal.name,
      abbreviation: teamglobal.abbreviation,
      imageUrl: teamglobal.imageUrl,
    });

    return updatedTeamglobal;
  }

  async deleteTeamglobal(teamglobalId: string): Promise<DeleteResult> {
    await this.getTeamglobalById(teamglobalId, undefined, true);

    return await this.teamglobalRepository.delete({ id: teamglobalId });
  }
}
