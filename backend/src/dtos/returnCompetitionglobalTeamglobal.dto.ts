import { CompetitionglobalTeamglobalEntity } from "../entities/competitionglobalTeamglobal.entity";
import { ReturnCompetitionglobalDto } from "./returnCompetitionglobal.dto";
import { ReturnTeamglobalDto } from "./returnTeamglobal.dto";

export class ReturnCompetitionglobalTeamglobalDto {
  id: string;

  competitionglobal?: ReturnCompetitionglobalDto;
  teamglobal?: ReturnTeamglobalDto;

  constructor(
    competitionglobalTeamglobalEntity: CompetitionglobalTeamglobalEntity,
  ) {
    this.id = competitionglobalTeamglobalEntity.id;

    this.competitionglobal = competitionglobalTeamglobalEntity.competitionglobal
      ? new ReturnCompetitionglobalDto(
          competitionglobalTeamglobalEntity.competitionglobal,
        )
      : undefined;

    this.teamglobal = competitionglobalTeamglobalEntity.teamglobal
      ? new ReturnTeamglobalDto(competitionglobalTeamglobalEntity.teamglobal)
      : undefined;
  }
}
