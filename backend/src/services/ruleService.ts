import { Repository } from "typeorm";
import { RuleEntity } from "../entities/ruleEntity";
import { AppDataSource } from "../config/orm";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { PAGINATION } from "../config/constants";
import { HttpError } from "../utils/httpError";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
import { RULE_MESSAGES } from "../utils/messages";

export class RuleService {
  constructor(
    private readonly ruleRepository: Repository<RuleEntity> = AppDataSource.getRepository(
      RuleEntity
    )
  ) {}

  async getRules(
    page: number,
    limit: number,
    relationsOptions?: RelationsOptionsType
  ): Promise<RuleEntity[]> {
    const skip = (page - PAGINATION.INITIAL_PAGE) * limit;

    const rules = await this.ruleRepository.find({
      // skip,
      // take: limit,
      relations: relationsOptions,
      order: { code: "ASC" },
    });

    return rules;
  }

  async getRuleById(
    ruleId: string,
    relationsOptions?: RelationsOptionsType,
    onlyWithoutCompetitionglobal = false
  ): Promise<RuleEntity> {
    if (onlyWithoutCompetitionglobal) {
      relationsOptions = {
        ...relationsOptions,
        competitionglobal: true,
      };
    }

    const rule = await this.ruleRepository.findOne({
      where: { id: ruleId },
      relations: relationsOptions,
    });

    if (!rule) {
      throw new HttpError(
        HttpStatusEnum.NotFound,
        RULE_MESSAGES.ERROR.RULE_ID_NOT_FOUND(ruleId)
      );
    }

    if (onlyWithoutCompetitionglobal && rule.competitionglobal) {
      throw new HttpError(
        HttpStatusEnum.Conflict,
        RULE_MESSAGES.ERROR.RULE_WITH_COMPETITIONGLOBAL(ruleId)
      );
    }

    return rule;
  }
}
