import { PlayerglobalPositionEntity } from "../entities/playerglobalPosition.entity";
import { ReturnPlayerglobalDto } from "./returnPlayerglobal.dto";
import { ReturnPositionDto } from "./returnPosition.dto";

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
