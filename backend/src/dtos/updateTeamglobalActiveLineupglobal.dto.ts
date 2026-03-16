import { Expose } from "class-transformer";
import { IsEnum } from "class-validator";
import { LineupPresetEnum } from "../enums/LineupPreset.enum";

export class UpdateTeamglobalActiveLineupglobalDto {
  @Expose()
  @IsEnum(LineupPresetEnum)
  lineupglobalPreset: LineupPresetEnum;
}
