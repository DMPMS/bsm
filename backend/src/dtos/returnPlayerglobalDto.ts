import { PlayerglobalEntity } from "../entities/playerglobalEntity";
import { ReturnCountryDto } from "./returnCountryDto";
import { ReturnPlayerglobalPositionDto } from "./returnPlayerglobalPositionDto";
import { ReturnTeamglobalDto } from "./returnTeamglobalDto";

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
      ? playerglobalEntity.playerglobalPositions.map(
          (playerglobalPosition) =>
            new ReturnPlayerglobalPositionDto(playerglobalPosition)
        )
      : undefined;

    this.teamglobal = playerglobalEntity.teamglobal
      ? new ReturnTeamglobalDto(playerglobalEntity.teamglobal)
      : undefined;
  }
}
