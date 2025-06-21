import { DeleteResult, EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../config/orm";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { PAGINATION } from "../config/constants";
import { HttpError } from "../utils/httpError";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
import { generateUuid } from "../utils/uuid";
import { RuleService } from "./ruleService";
import { CompetitionglobalEntity } from "../entities/competitionglobalEntity";
import { COMPETITIONGLOBAL_MESSAGES } from "../utils/messages";
import { CreateCompetitionglobalDto } from "../dtos/createCompetitionglobalDto";
import { UpdateCompetitionglobalDto } from "../dtos/updateCompetitionglobalDto";
import { TeamglobalService } from "./teamglobalService";
import { CompetitionglobalTeamglobalService } from "./competitionglobalTeamglobalService";

export class CompetitionglobalService {
  private readonly ruleService: RuleService;
  private readonly teamglobalService: TeamglobalService;
  private _competitionglobalTeamglobalService?: CompetitionglobalTeamglobalService;

  constructor(
    private readonly competitionglobalRepository: Repository<CompetitionglobalEntity> = AppDataSource.getRepository(
      CompetitionglobalEntity
    )
  ) {
    this.ruleService = new RuleService();
    this.teamglobalService = new TeamglobalService();
  }

  private get competitionglobalTeamglobalService(): CompetitionglobalTeamglobalService {
    if (!this._competitionglobalTeamglobalService) {
      this._competitionglobalTeamglobalService =
        new CompetitionglobalTeamglobalService();
    }
    return this._competitionglobalTeamglobalService;
  }

  async getCompetitionglobals(
    page: number,
    limit: number,
    relationsOptions?: RelationsOptionsType
  ): Promise<CompetitionglobalEntity[]> {
    const skip = (page - PAGINATION.INITIAL_PAGE) * limit;

    const competitionglobals = await this.competitionglobalRepository.find({
      // skip,
      // take: limit,
      relations: relationsOptions,
      order: {
        rule: {
          country: {
            name: "ASC",
          },
          code: "ASC",
        },
      },
    });

    return competitionglobals;
  }

  async getCompetitionglobalById(
    competitionglobalId: string,
    relationsOptions?: RelationsOptionsType,
    entityManager?: EntityManager
  ): Promise<CompetitionglobalEntity> {
    const repository = entityManager
      ? entityManager.getRepository(CompetitionglobalEntity)
      : this.competitionglobalRepository;

    const competitionglobal = await repository.findOne({
      where: { id: competitionglobalId },
      relations: relationsOptions,
    });

    if (!competitionglobal) {
      throw new HttpError(
        HttpStatusEnum.NotFound,
        COMPETITIONGLOBAL_MESSAGES.ERROR.COMPETITIONGLOBAL_ID_NOT_FOUND(
          competitionglobalId
        )
      );
    }

    return competitionglobal;
  }

  async createCompetitionglobal(
    createCompetitionglobalDto: CreateCompetitionglobalDto
  ): Promise<CompetitionglobalEntity> {
    const rule = await this.ruleService.getRuleById(
      createCompetitionglobalDto.ruleId,
      undefined,
      true
    );

    if (
      createCompetitionglobalDto.teamglobalIds.length !== rule.numberOfTeams
    ) {
      throw new HttpError(
        HttpStatusEnum.BadRequest,
        COMPETITIONGLOBAL_MESSAGES.ERROR.TEAMGLOBALS_COUNT_INVALID(
          createCompetitionglobalDto.teamglobalIds.length,
          rule.numberOfTeams
        )
      );
    }

    await Promise.all(
      createCompetitionglobalDto.teamglobalIds.map((teamglobalId) =>
        this.teamglobalService.getTeamglobalById(teamglobalId)
      )
    );

    return await AppDataSource.transaction(
      async (entityManager: EntityManager) => {
        const repository = entityManager.getRepository(CompetitionglobalEntity);

        const savedCompetitionglobal = await repository.save({
          ...createCompetitionglobalDto,
          id: generateUuid(),
          imageUrl: createCompetitionglobalDto.imageUrl
            ? createCompetitionglobalDto.imageUrl
            : null,
        });

        for (const teamglobalId of createCompetitionglobalDto.teamglobalIds) {
          await this.competitionglobalTeamglobalService.createCompetitionglobalTeamglobal(
            {
              competitionglobalId: savedCompetitionglobal.id,
              teamglobalId: teamglobalId,
              ruleCode: rule.code,
            },
            entityManager
          );
        }

        return savedCompetitionglobal;
      }
    );
  }

  async updateCompetitionglobal(
    updateCompetitionglobalDto: UpdateCompetitionglobalDto,
    competitionglobalId: string
  ): Promise<CompetitionglobalEntity> {
    const competitionglobal = await this.getCompetitionglobalById(
      competitionglobalId
    );

    const rule = await this.ruleService.getRuleById(
      updateCompetitionglobalDto.ruleId,
      undefined,
      updateCompetitionglobalDto.ruleId !== competitionglobal.ruleId
        ? true
        : false
    );

    if (
      updateCompetitionglobalDto.teamglobalIds.length !== rule.numberOfTeams
    ) {
      throw new HttpError(
        HttpStatusEnum.BadRequest,
        COMPETITIONGLOBAL_MESSAGES.ERROR.TEAMGLOBALS_COUNT_INVALID(
          updateCompetitionglobalDto.teamglobalIds.length,
          rule.numberOfTeams
        )
      );
    }

    await Promise.all(
      updateCompetitionglobalDto.teamglobalIds.map((teamglobalId) =>
        this.teamglobalService.getTeamglobalById(teamglobalId)
      )
    );

    return await AppDataSource.transaction(
      async (entityManager: EntityManager) => {
        const repository = entityManager.getRepository(CompetitionglobalEntity);

        const updatedCompetitionglobal = await repository.save({
          ...competitionglobal,
          ...updateCompetitionglobalDto,
          imageUrl: updateCompetitionglobalDto.imageUrl
            ? updateCompetitionglobalDto.imageUrl
            : null,
        });

        await this.competitionglobalTeamglobalService.deleteCompetitionglobalTeamglobal(
          updatedCompetitionglobal.id,
          entityManager
        );

        for (const teamglobalId of updateCompetitionglobalDto.teamglobalIds) {
          await this.competitionglobalTeamglobalService.createCompetitionglobalTeamglobal(
            {
              competitionglobalId: updatedCompetitionglobal.id,
              teamglobalId: teamglobalId,
              ruleCode: rule.code,
            },
            entityManager
          );
        }

        return updatedCompetitionglobal;
      }
    );
  }

  async deleteCompetitionglobal(
    competitionglobalId: string
  ): Promise<DeleteResult> {
    await this.getCompetitionglobalById(competitionglobalId);

    return await this.competitionglobalRepository.delete({
      id: competitionglobalId,
    });
  }
}
