import { CountryEntity } from "../entities/countryEntity";

export class ReturnCountryDto {
  id: string;
  name: string;

  constructor(countryEntity: CountryEntity) {
    this.id = countryEntity.id;
    this.name = countryEntity.name;
  }
}
