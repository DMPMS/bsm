import { Expose } from "class-transformer";
import { IsInt, Max, Min } from "class-validator";
import { SETTINGSGLOBAL } from "../config/constants";

export class UpdateSettingsglobalDto {
  @Expose()
  @IsInt()
  @Min(SETTINGSGLOBAL.SEASON_OFFSET.MIN)
  @Max(SETTINGSGLOBAL.SEASON_OFFSET.MAX)
  seasonOffset: number;
}
