import { DeleteResult, EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../config/orm";
import { generateUuid } from "../utils/uuid";
import { CompetitionglobalService } from "./competitionglobalService";
import { TeamglobalService } from "./teamglobalService";
import { CompetitionglobalTeamglobalEntity } from "../entities/competitionglobalTeamglobalEntity";
import { CreateCompetitionglobalTeamglobalDto } from "../dtos/createCompetitionglobalTeamglobal";
import { checkRuleConflict } from "../utils/checkRuleConflict";

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

    checkRuleConflict(
      teamglobalWithCompetitionglobals,
      createCompetitionglobalTeamglobalDto.ruleCode
    );

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
