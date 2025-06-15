import { CompetitionglobalEntity } from "../entities/competitionglobalEntity";
import { ReturnRuleDto } from "./returnRuleDto";

export class ReturnCompetitionglobalDto {
  id: string;
  name: string;
  imageUrl: string | null;
  season: string;

  rule?: ReturnRuleDto;

  constructor(competitionglobalEntity: CompetitionglobalEntity) {
    this.id = competitionglobalEntity.id;
    this.name = competitionglobalEntity.name;
    this.imageUrl = competitionglobalEntity.imageUrl;
    this.season = competitionglobalEntity.season;

    this.rule = competitionglobalEntity.rule
      ? new ReturnRuleDto(competitionglobalEntity.rule)
      : undefined;
  }
}
