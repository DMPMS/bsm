import { TeamglobalEntity } from "../entities/teamglobal.entity";
import { LineupPresetEnum } from "../enums/LineupPreset.enum";
import { ReturnCompetitionglobalTeamglobalDto } from "./returnCompetitionglobalTeamglobal.dto";
import { ReturnCountryDto } from "./returnCountry.dto";
import { ReturnLineupglobalDto } from "./returnLineupglobal.dto";
import { ReturnManagerglobalDto } from "./returnManagerglobal.dto";
import { ReturnPlayerglobalDto } from "./returnPlayerglobal.dto";

export class ReturnTeamglobalDto {
  id: string;
  name: string;
  abbreviation: string;
  imageUrl: string | null;
  activeLineupglobalPreset: LineupPresetEnum;

  country?: ReturnCountryDto;
  managerglobal?: ReturnManagerglobalDto;
  playerglobals?: ReturnPlayerglobalDto[];
  lineupglobals?: ReturnLineupglobalDto[];
  competitionglobalTeamglobals?: ReturnCompetitionglobalTeamglobalDto[];

  constructor(teamglobalEntity: TeamglobalEntity) {
    this.id = teamglobalEntity.id;
    this.name = teamglobalEntity.name;
    this.abbreviation = teamglobalEntity.abbreviation;
    this.imageUrl = teamglobalEntity.imageUrl;
    this.activeLineupglobalPreset = teamglobalEntity.activeLineupglobalPreset;

    this.country = teamglobalEntity.country
      ? new ReturnCountryDto(teamglobalEntity.country)
      : undefined;

    this.managerglobal = teamglobalEntity.managerglobal
      ? new ReturnManagerglobalDto(teamglobalEntity.managerglobal)
      : undefined;

    this.playerglobals = teamglobalEntity.playerglobals
      ? teamglobalEntity.playerglobals.map(
          (playerglobal) => new ReturnPlayerglobalDto(playerglobal),
        )
      : undefined;

    this.lineupglobals = teamglobalEntity.lineupglobals
      ? teamglobalEntity.lineupglobals.map(
          (lineupglobal) => new ReturnLineupglobalDto(lineupglobal),
        )
      : undefined;

    this.competitionglobalTeamglobals =
      teamglobalEntity.competitionglobalTeamglobals
        ? teamglobalEntity.competitionglobalTeamglobals.map(
            (competitionglobalTeamglobal) =>
              new ReturnCompetitionglobalTeamglobalDto(
                competitionglobalTeamglobal,
              ),
          )
        : undefined;
  }
}
