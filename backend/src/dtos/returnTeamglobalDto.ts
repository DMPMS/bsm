import { TeamglobalEntity } from "../entities/teamglobalEntity";
import { ReturnCountryDto } from "./returnCountryDto";
import { ReturnManagerglobalDto } from "./returnManagerglobalDto";

export class ReturnTeamglobalDto {
  id: string;
  name: string;
  abbreviation: string;
  imageUrl: string | null;

  country?: ReturnCountryDto;
  managerglobal?: ReturnManagerglobalDto;

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
  }
}
