import { CompetitionglobalEntity } from "../entities/competitionglobal.entity";
import { ReturnCompetitionglobalTeamglobalDto } from "./returnCompetitionglobalTeamglobal.dto";
import { ReturnRuleDto } from "./returnRule.dto";

export class ReturnCompetitionglobalDto {
  id: string;
  name: string;
  imageUrl: string | null;
  season: string;

  rule?: ReturnRuleDto;
  competitionglobalTeamglobals?: ReturnCompetitionglobalTeamglobalDto[];

  constructor(competitionglobalEntity: CompetitionglobalEntity) {
    this.id = competitionglobalEntity.id;
    this.name = competitionglobalEntity.name;
    this.imageUrl = competitionglobalEntity.imageUrl;
    this.season = competitionglobalEntity.season;

    this.rule = competitionglobalEntity.rule
      ? new ReturnRuleDto(competitionglobalEntity.rule)
      : undefined;

    this.competitionglobalTeamglobals =
      competitionglobalEntity.competitionglobalTeamglobals
        ? competitionglobalEntity.competitionglobalTeamglobals.map(
            (competitionglobalTeamglobal) =>
              new ReturnCompetitionglobalTeamglobalDto(
                competitionglobalTeamglobal
              )
          )
        : undefined;
  }
}
