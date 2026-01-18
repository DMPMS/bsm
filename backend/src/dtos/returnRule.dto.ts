import { RuleEntity } from "../entities/rule.entity";
import { RuleCodeEnum } from "../enums/RuleCode.enum";
import { ReturnCompetitionglobalDto } from "./returnCompetitionglobal.dto";
import { ReturnCountryDto } from "./returnCountry.dto";

export class ReturnRuleDto {
  id: string;
  name: string;
  numberOfTeams: number;
  description: string | null;
  defaultCompetitionName: string;
  defaultCompetitionImageUrl: string | null;
  code: RuleCodeEnum;

  country?: ReturnCountryDto;
  competitionglobal?: ReturnCompetitionglobalDto;

  constructor(ruleEntity: RuleEntity) {
    this.id = ruleEntity.id;
    this.name = ruleEntity.name;
    this.numberOfTeams = ruleEntity.numberOfTeams;
    this.description = ruleEntity.description;
    this.defaultCompetitionName = ruleEntity.defaultCompetitionName;
    this.defaultCompetitionImageUrl = ruleEntity.defaultCompetitionImageUrl;
    this.code = ruleEntity.code;

    this.country = ruleEntity.country
      ? new ReturnCountryDto(ruleEntity.country)
      : undefined;

    this.competitionglobal = ruleEntity.competitionglobal
      ? new ReturnCompetitionglobalDto(ruleEntity.competitionglobal)
      : undefined;
  }
}
