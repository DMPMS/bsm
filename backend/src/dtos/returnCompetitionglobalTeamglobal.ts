import { CompetitionglobalTeamglobalEntity } from "../entities/competitionglobalTeamglobalEntity";
import { ReturnCompetitionglobalDto } from "./returnCompetitionglobalDto";
import { ReturnTeamglobalDto } from "./returnTeamglobalDto";

export class ReturnCompetitionglobalTeamglobalDto {
  id: string;

  competitionglobal?: ReturnCompetitionglobalDto;
  teamglobal?: ReturnTeamglobalDto;

  constructor(
    competitionglobalTeamglobalEntity: CompetitionglobalTeamglobalEntity
  ) {
    this.id = competitionglobalTeamglobalEntity.id;

    this.competitionglobal = competitionglobalTeamglobalEntity.competitionglobal
      ? new ReturnCompetitionglobalDto(
          competitionglobalTeamglobalEntity.competitionglobal
        )
      : undefined;

    this.teamglobal = competitionglobalTeamglobalEntity.teamglobal
      ? new ReturnTeamglobalDto(competitionglobalTeamglobalEntity.teamglobal)
      : undefined;
  }
}
