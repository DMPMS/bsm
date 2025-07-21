import { CountryEntity } from "../entities/country.entity";
import { CountryCodeEnum } from "../enums/CountryCode.enum";

export class ReturnCountryDto {
  id: string;
  name: string;
  code: CountryCodeEnum;

  constructor(countryEntity: CountryEntity) {
    this.id = countryEntity.id;
    this.name = countryEntity.name;
    this.code = countryEntity.code;
  }
}
