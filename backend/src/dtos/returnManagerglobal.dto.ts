import { ManagerglobalEntity } from "../entities/managerglobal.entity";
import { ReturnCountryDto } from "./returnCountry.dto";
import { ReturnTeamglobalDto } from "./returnTeamglobal.dto";

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
