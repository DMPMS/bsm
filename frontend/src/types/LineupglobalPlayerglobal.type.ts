import type { LineupSpotEnum } from "../enums/LineupSpot.enum";

export interface LineupglobalPlayerglobalType {
  id: string;
  spot: LineupSpotEnum;
  isCaptain: boolean;
  isFreeKickTaker: boolean;
  isLeftCornerTaker: boolean;
  isRightCornerTaker: boolean;

  playerglobalId: string;
}
