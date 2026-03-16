import { LineupglobalPlayerglobalEntity } from "../entities/lineupglobalPlayerglobal.entity";
import { LineupSpotEnum } from "../enums/LineupSpot.enum";

export class ReturnLineupglobalPlayerglobalDto {
  id: string;
  spot: LineupSpotEnum;
  isCaptain: boolean;
  isFreeKickTaker: boolean;
  isLeftCornerTaker: boolean;
  isRightCornerTaker: boolean;

  playerglobalId: string;

  constructor(playerglobalPositionEntity: LineupglobalPlayerglobalEntity) {
    this.id = playerglobalPositionEntity.id;
    this.spot = playerglobalPositionEntity.spot;
    this.isCaptain = playerglobalPositionEntity.isCaptain;
    this.isFreeKickTaker = playerglobalPositionEntity.isFreeKickTaker;
    this.isLeftCornerTaker = playerglobalPositionEntity.isLeftCornerTaker;
    this.isRightCornerTaker = playerglobalPositionEntity.isRightCornerTaker;

    this.playerglobalId = playerglobalPositionEntity.playerglobalId;
  }
}
