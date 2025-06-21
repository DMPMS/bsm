import { Request, Response } from "express";
import { PAGINATION } from "../config/constants";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { HttpError } from "../utils/httpError";
import { RuleService } from "../services/rule.service";
import { ReturnRuleDto } from "../dtos/returnRule.dto";
import { RULE_MESSAGES } from "../utils/messages";
import { RelationsOptionsType } from "../types/RelationsOptions.type";

export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  async getRules(req: Request, res: Response): Promise<void> {
    try {
      const {
        page = PAGINATION.DEFAULT_PAGE,
        limit = PAGINATION.DEFAULT_LIMIT,
      } = req.query;

      const relationsOptions: RelationsOptionsType = {
        country: true,
      };

      const rules = await this.ruleService.getRules(
        Number(page),
        Number(limit),
        relationsOptions
      );

      res
        .status(HttpStatusEnum.Ok)
        .json(rules.map((rule) => new ReturnRuleDto(rule)));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(RULE_MESSAGES.ERROR.SELECT_RULE_ERROR);
      }
    }
  }
}
