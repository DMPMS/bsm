import { Expose } from "class-transformer";
import { IsEnum } from "class-validator";
import { SeasonOffsetEnum } from "../enums/SeasonOffset.enum";

export class UpdateSettingsglobalDto {
  @Expose()
  @IsEnum(SeasonOffsetEnum)
  seasonOffset: SeasonOffsetEnum;
}
