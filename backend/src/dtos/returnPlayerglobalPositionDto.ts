import { PlayerglobalPositionEntity } from "../entities/playerglobalPositionEntity";
import { ReturnPlayerglobalDto } from "./returnPlayerglobalDto";
import { ReturnPositionDto } from "./returnPositionDto";

export class ReturnPlayerglobalPositionDto {
  id: string;
  isPrimary: boolean;

  playerglobal?: ReturnPlayerglobalDto;
  position?: ReturnPositionDto;

  constructor(playerglobalPositionEntity: PlayerglobalPositionEntity) {
    this.id = playerglobalPositionEntity.id;
    this.isPrimary = playerglobalPositionEntity.isPrimary;

    this.playerglobal = playerglobalPositionEntity.playerglobal
      ? new ReturnPlayerglobalDto(playerglobalPositionEntity.playerglobal)
      : undefined;

    this.position = playerglobalPositionEntity.position
      ? new ReturnPositionDto(playerglobalPositionEntity.position)
      : undefined;
  }
}
