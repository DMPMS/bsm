import { DeleteResult, EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../config/orm";
import { generateUuid } from "../utils/uuid";
import { CompetitionglobalService } from "./competitionglobal.service";
import { TeamglobalService } from "./teamglobal.service";
import { CompetitionglobalTeamglobalEntity } from "../entities/competitionglobalTeamglobal.entity";
import { CreateCompetitionglobalTeamglobalDto } from "../dtos/createCompetitionglobalTeamglobal.dto";
import { hasRuleConflict } from "../utils/rulesRelations";
import { HttpError } from "../utils/httpError";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { COMPETITIONGLOBAL_MESSAGES } from "../utils/messages";

export class CompetitionglobalTeamglobalService {
  private readonly competitionglobalService: CompetitionglobalService;
  private readonly teamglobalService: TeamglobalService;

  constructor(
    private readonly competitionglobalTeamglobalRepository: Repository<CompetitionglobalTeamglobalEntity> = AppDataSource.getRepository(
      CompetitionglobalTeamglobalEntity
    )
  ) {
    this.competitionglobalService = new CompetitionglobalService();
    this.teamglobalService = new TeamglobalService();
  }

  async createCompetitionglobalTeamglobal(
    createCompetitionglobalTeamglobalDto: CreateCompetitionglobalTeamglobalDto,
    entityManager?: EntityManager
  ): Promise<void> {
    const repository = entityManager
      ? entityManager.getRepository(CompetitionglobalTeamglobalEntity)
      : this.competitionglobalTeamglobalRepository;

    await this.competitionglobalService.getCompetitionglobalById(
      createCompetitionglobalTeamglobalDto.competitionglobalId,
      undefined,
      entityManager
    );

    const teamglobalWithCompetitionglobals =
      await this.teamglobalService.getTeamglobalById(
        createCompetitionglobalTeamglobalDto.teamglobalId,
        { competitionglobalTeamglobals: { competitionglobal: { rule: true } } },
        undefined,
        entityManager
      );

    const ruleCodes =
      teamglobalWithCompetitionglobals.competitionglobalTeamglobals
        ? teamglobalWithCompetitionglobals.competitionglobalTeamglobals.map(
            (competitionglobalTeamglobal) =>
              competitionglobalTeamglobal.competitionglobal!.rule!.code
          )
        : [];

    if (
      hasRuleConflict(createCompetitionglobalTeamglobalDto.ruleCode, ruleCodes)
    ) {
      throw new HttpError(
        HttpStatusEnum.Conflict,
        COMPETITIONGLOBAL_MESSAGES.ERROR.COMPETITION_RULE_CONFLICT_MESSAGE(
          createCompetitionglobalTeamglobalDto.teamglobalId
        )
      );
    }

    await repository.save({
      ...createCompetitionglobalTeamglobalDto,
      id: generateUuid(),
    });
  }

  async deleteCompetitionglobalTeamglobal(
    competitionglobalId: string,
    entityManager?: EntityManager
  ): Promise<DeleteResult> {
    const repository = entityManager
      ? entityManager.getRepository(CompetitionglobalTeamglobalEntity)
      : this.competitionglobalTeamglobalRepository;

    await this.competitionglobalService.getCompetitionglobalById(
      competitionglobalId,
      undefined,
      entityManager
    );

    return await repository.delete({
      competitionglobalId: competitionglobalId,
    });
  }
}
