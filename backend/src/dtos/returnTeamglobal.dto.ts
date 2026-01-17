import { TeamglobalEntity } from "../entities/teamglobal.entity";
import { ReturnCompetitionglobalTeamglobalDto } from "./returnCompetitionglobalTeamglobal.dto";
import { ReturnCountryDto } from "./returnCountry.dto";
import { ReturnManagerglobalDto } from "./returnManagerglobal.dto";
import { ReturnPlayerglobalDto } from "./returnPlayerglobal.dto";

export class ReturnTeamglobalDto {
  id: string;
  name: string;
  abbreviation: string;
  imageUrl: string | null;

  country?: ReturnCountryDto;
  managerglobal?: ReturnManagerglobalDto;
  playerglobals?: ReturnPlayerglobalDto[];
  competitionglobalTeamglobals?: ReturnCompetitionglobalTeamglobalDto[];

  constructor(teamglobalEntity: TeamglobalEntity) {
    this.id = teamglobalEntity.id;
    this.name = teamglobalEntity.name;
    this.abbreviation = teamglobalEntity.abbreviation;
    this.imageUrl = teamglobalEntity.imageUrl;

    this.country = teamglobalEntity.country
      ? new ReturnCountryDto(teamglobalEntity.country)
      : undefined;

    this.managerglobal = teamglobalEntity.managerglobal
      ? new ReturnManagerglobalDto(teamglobalEntity.managerglobal)
      : undefined;

    this.playerglobals = teamglobalEntity.playerglobals
      ? teamglobalEntity.playerglobals.map(
          (playerglobal) => new ReturnPlayerglobalDto(playerglobal)
        )
      : undefined;

    this.competitionglobalTeamglobals =
      teamglobalEntity.competitionglobalTeamglobals
        ? teamglobalEntity.competitionglobalTeamglobals.map(
            (competitionglobalTeamglobal) =>
              new ReturnCompetitionglobalTeamglobalDto(
                competitionglobalTeamglobal
              )
          )
        : undefined;
  }
}
