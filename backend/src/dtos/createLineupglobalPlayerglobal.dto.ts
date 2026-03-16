import { Expose } from "class-transformer";
import { IsBoolean, IsEnum, IsUUID } from "class-validator";
import { UUID_VERSION } from "../config/constants";
import { LineupSpotEnum } from "../enums/LineupSpot.enum";

export class CreateLineupglobalPlayerglobalDto {
  @Expose()
  @IsUUID(UUID_VERSION)
  lineupglobalId: string;

  @Expose()
  @IsUUID(UUID_VERSION)
  playerglobalId: string;

  @Expose()
  @IsEnum(LineupSpotEnum)
  spot: LineupSpotEnum;

  @Expose()
  @IsBoolean()
  isCaptain: boolean;

  @Expose()
  @IsBoolean()
  isFreeKickTaker: boolean;

  @Expose()
  @IsBoolean()
  isLeftCornerTaker: boolean;

  @Expose()
  @IsBoolean()
  isRightCornerTaker: boolean;
}
