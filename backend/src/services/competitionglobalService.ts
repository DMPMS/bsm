import { DeleteResult, Repository } from "typeorm";
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

export class CompetitionglobalService {
  private readonly ruleService: RuleService;

  constructor(
    private readonly competitionglobalRepository: Repository<CompetitionglobalEntity> = AppDataSource.getRepository(
      CompetitionglobalEntity
    )
  ) {
    this.ruleService = new RuleService();
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
          displayOrder: "ASC",
        },
      },
    });

    return competitionglobals;
  }

  async getCompetitionglobalById(
    competitionglobalId: string,
    relationsOptions?: RelationsOptionsType
  ): Promise<CompetitionglobalEntity> {
    const competitionglobal = await this.competitionglobalRepository.findOne({
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
    await this.ruleService.getRuleById(
      createCompetitionglobalDto.ruleId,
      undefined,
      true
    );

    const savedCompetitionglobal = await this.competitionglobalRepository.save({
      ...createCompetitionglobalDto,
      id: generateUuid(),
      imageUrl: createCompetitionglobalDto.imageUrl
        ? createCompetitionglobalDto.imageUrl
        : null,
    });

    return savedCompetitionglobal;
  }

  async updateCompetitionglobal(
    updateCompetitionglobalDto: UpdateCompetitionglobalDto,
    competitionglobalId: string
  ): Promise<CompetitionglobalEntity> {
    const competitionglobal = await this.getCompetitionglobalById(
      competitionglobalId
    );

    if (updateCompetitionglobalDto.ruleId !== competitionglobal.ruleId) {
      await this.ruleService.getRuleById(
        updateCompetitionglobalDto.ruleId,
        undefined,
        true
      );
    }

    const updatedCompetitionglobal =
      await this.competitionglobalRepository.save({
        ...competitionglobal,
        ...updateCompetitionglobalDto,
        imageUrl: updateCompetitionglobalDto.imageUrl
          ? updateCompetitionglobalDto.imageUrl
          : null,
      });

    return updatedCompetitionglobal;
  }

  async deleteCompetitionglobal(
    competitionglobalId: string
  ): Promise<DeleteResult> {
    await this.getCompetitionglobalById(competitionglobalId);

    return this.competitionglobalRepository.delete({ id: competitionglobalId });
  }
}
