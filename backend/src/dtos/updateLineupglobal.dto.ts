import { Expose, Type } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsUUID,
  Validate,
  ValidateNested,
} from "class-validator";
import { LineupFormationEnum } from "../enums/LineupFormation.enum";
import { LineupPlayStyleEnum } from "../enums/LineupPlayStyle.enum";
import { LineupMarkingStyleEnum } from "../enums/LineupMarkingStyle.enum";
import { LineupDefenseLineEnum } from "../enums/LineupDefenseLine.enum";
import { LineupIntensityEnum } from "../enums/LineupIntensity.enum";
import { UUID_VERSION } from "../config/constants";
import { SpotPlayerDto } from "./spotPlayer.dto";
import { IsLineupSpotPlayers } from "../validators/isLineupSpotPlayers";

export class UpdateLineupglobalDto {
  @Expose()
  @IsEnum(LineupFormationEnum)
  formation: LineupFormationEnum;

  @Expose()
  @IsEnum(LineupPlayStyleEnum)
  playStyle: LineupPlayStyleEnum;

  @Expose()
  @IsEnum(LineupMarkingStyleEnum)
  markingStyle: LineupMarkingStyleEnum;

  @Expose()
  @IsEnum(LineupDefenseLineEnum)
  defenseLine: LineupDefenseLineEnum;

  @Expose()
  @IsEnum(LineupIntensityEnum)
  intensity: LineupIntensityEnum;

  @Expose()
  @IsUUID(UUID_VERSION)
  captainPlayerglobalId: string;

  @Expose()
  @IsUUID(UUID_VERSION)
  freeKickTakerPlayerglobalId: string;

  @Expose()
  @IsUUID(UUID_VERSION)
  leftCornerTakerPlayerglobalId: string;

  @Expose()
  @IsUUID(UUID_VERSION)
  rightCornerTakerPlayerglobalId: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpotPlayerDto)
  @Validate(IsLineupSpotPlayers)
  spotPlayerglobals: SpotPlayerDto[];
}
