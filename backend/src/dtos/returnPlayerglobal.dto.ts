import { PlayerglobalEntity } from "../entities/playerglobal.entity";
import { ReturnCountryDto } from "./returnCountry.dto";
import { ReturnPlayerglobalPositionDto } from "./returnPlayerglobalPosition.dto";
import { ReturnTeamglobalDto } from "./returnTeamglobal.dto";

export class ReturnPlayerglobalDto {
  id: string;
  name: string;
  imageUrl: string | null;
  birthdate: string;
  overall: number;

  country?: ReturnCountryDto;
  playerglobalPositions?: ReturnPlayerglobalPositionDto[];
  teamglobal?: ReturnTeamglobalDto;

  constructor(playerglobalEntity: PlayerglobalEntity) {
    this.id = playerglobalEntity.id;
    this.name = playerglobalEntity.name;
    this.imageUrl = playerglobalEntity.imageUrl;
    this.birthdate = playerglobalEntity.birthdate;
    this.overall = playerglobalEntity.overall;

    this.country = playerglobalEntity.country
      ? new ReturnCountryDto(playerglobalEntity.country)
      : undefined;

    this.playerglobalPositions = playerglobalEntity.playerglobalPositions
      ? playerglobalEntity.playerglobalPositions
          .sort((a, b) => a.position!.code - b.position!.code)
          .map(
            (playerglobalPosition) =>
              new ReturnPlayerglobalPositionDto(playerglobalPosition),
          )
      : undefined;

    this.teamglobal = playerglobalEntity.teamglobal
      ? new ReturnTeamglobalDto(playerglobalEntity.teamglobal)
      : undefined;
  }
}
