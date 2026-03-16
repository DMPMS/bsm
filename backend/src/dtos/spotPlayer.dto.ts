import { Expose } from "class-transformer";
import { IsEnum, IsUUID } from "class-validator";
import { LineupSpotEnum } from "../enums/LineupSpot.enum";
import { UUID_VERSION } from "../config/constants";

export class SpotPlayerDto {
  @Expose()
  @IsEnum(LineupSpotEnum)
  spot: LineupSpotEnum;

  @Expose()
  @IsUUID(UUID_VERSION)
  playerId: string;
}
