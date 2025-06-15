import { RuleEntity } from "../entities/ruleEntity";
import { ReturnCountryDto } from "./returnCountryDto";

export class ReturnRuleDto {
  id: string;
  name: string;
  numberOfTeams: number;
  description: string | null;
  defaultCompetitionName: string;
  defaultCompetitionImageUrl: string | null;
  displayOrder: number;

  country?: ReturnCountryDto;

  constructor(ruleEntity: RuleEntity) {
    this.id = ruleEntity.id;
    this.name = ruleEntity.name;
    this.numberOfTeams = ruleEntity.numberOfTeams;
    this.description = ruleEntity.description;
    this.defaultCompetitionName = ruleEntity.defaultCompetitionName;
    this.defaultCompetitionImageUrl = ruleEntity.defaultCompetitionImageUrl;
    this.displayOrder = ruleEntity.displayOrder;

    this.country = ruleEntity.country
      ? new ReturnCountryDto(ruleEntity.country)
      : undefined;
  }
}
