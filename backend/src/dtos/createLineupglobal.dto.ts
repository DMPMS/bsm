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
import { LineupPresetEnum } from "../enums/LineupPreset.enum";
import { SpotPlayerDto } from "./spotPlayer.dto";
import { IsLineupSpotPlayers } from "../validators/isLineupSpotPlayers";

export class CreateLineupglobalDto {
  @Expose()
  @IsUUID(UUID_VERSION)
  teamglobalId: string;

  @Expose()
  @IsEnum(LineupPresetEnum)
  preset: LineupPresetEnum;

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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpotPlayerDto)
  @Validate(IsLineupSpotPlayers)
  spotPlayerglobals: SpotPlayerDto[];
}
