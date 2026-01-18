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

export class TeamglobalService {
  private readonly countryService: CountryService;
  private readonly managerglobalService: ManagerglobalService;
  private readonly playerglobalService: PlayerglobalService;

  constructor(
    private readonly teamglobalRepository: Repository<TeamglobalEntity> = AppDataSource.getRepository(
      TeamglobalEntity,
    ),
  ) {
    this.countryService = new CountryService();
    this.managerglobalService = new ManagerglobalService();
    this.playerglobalService = new PlayerglobalService();
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
          ...createTeamglobalDto,
          id: generateUuid(),
          imageUrl: createTeamglobalDto.imageUrl
            ? createTeamglobalDto.imageUrl
            : null,
          abbreviation: createTeamglobalDto.abbreviation.toUpperCase(),
        });

        for (const playerglobalId of createTeamglobalDto.playerglobalIds) {
          await this.playerglobalService.updatePlayerglobalTeamglobalId(
            savedTeamglobal.id,
            playerglobalId,
            entityManager,
          );
        }

        return savedTeamglobal;
      },
    );
  }

  async updateTeamglobal(
    updateTeamglobalDto: UpdateTeamglobalDto,
    teamglobalId: string,
  ): Promise<TeamglobalEntity> {
    const teamglobal = await this.getTeamglobalById(teamglobalId);

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
          ...teamglobal,
          ...updateTeamglobalDto,
          imageUrl: updateTeamglobalDto.imageUrl
            ? updateTeamglobalDto.imageUrl
            : null,
          abbreviation: updateTeamglobalDto.abbreviation.toUpperCase(),
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

  async deleteTeamglobal(teamglobalId: string): Promise<DeleteResult> {
    await this.getTeamglobalById(teamglobalId, undefined, true);

    return await this.teamglobalRepository.delete({ id: teamglobalId });
  }
}
