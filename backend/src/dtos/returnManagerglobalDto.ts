import { ManagerglobalEntity } from "../entities/managerglobalEntity";
import { ReturnCountryDto } from "./returnCountryDto";
import { ReturnTeamglobalDto } from "./returnTeamglobalDto";

export class ReturnManagerglobalDto {
  id: string;
  name: string;
  imageUrl: string | null;
  birthdate: string;

  country?: ReturnCountryDto;
  teamglobal?: ReturnTeamglobalDto;

  constructor(managerglobalEntity: ManagerglobalEntity) {
    this.id = managerglobalEntity.id;
    this.name = managerglobalEntity.name;
    this.imageUrl = managerglobalEntity.imageUrl;
    this.birthdate = managerglobalEntity.birthdate;

    this.country = managerglobalEntity.country
      ? new ReturnCountryDto(managerglobalEntity.country)
      : undefined;

    this.teamglobal = managerglobalEntity.teamglobal
      ? new ReturnTeamglobalDto(managerglobalEntity.teamglobal)
      : undefined;
  }
}
