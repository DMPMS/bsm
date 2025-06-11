import { PlayerglobalEntity } from "../entities/playerglobalEntity";
import { ReturnCountryDto } from "./returnCountryDto";

export class ReturnPlayerglobalDto {
  id: string;
  name: string;
  imageUrl: string | null;
  birthdate: string;
  overall: number;

  country?: ReturnCountryDto;

  constructor(playerglobalEntity: PlayerglobalEntity) {
    this.id = playerglobalEntity.id;
    this.name = playerglobalEntity.name;
    this.imageUrl = playerglobalEntity.imageUrl;
    this.birthdate = playerglobalEntity.birthdate;
    this.overall = playerglobalEntity.overall;

    this.country = playerglobalEntity.country
      ? new ReturnCountryDto(playerglobalEntity.country)
      : undefined;
  }
}
