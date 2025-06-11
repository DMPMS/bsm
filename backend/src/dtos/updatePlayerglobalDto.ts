import { Expose } from "class-transformer";
import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
  Validate,
} from "class-validator";
import { isValidImage } from "../validators/isValidImage";
import { IsCustomDate } from "../validators/isCustomDate";
import { IsDateWithinAgeRange } from "../validators/isDateWithinAgeRange";
import { PLAYERGLOBAL } from "../config/constants";

export class UpdatePlayerglobalDto {
  @Expose()
  @IsUUID()
  countryId: string;

  @Expose()
  @IsString()
  @Length(PLAYERGLOBAL.NAME.MIN, PLAYERGLOBAL.NAME.MAX)
  name: string;

  @Expose()
  @IsString()
  @Validate(isValidImage)
  @IsOptional()
  imageUrl?: string | null;

  @Expose()
  @IsString()
  @Validate(IsCustomDate)
  @Validate(IsDateWithinAgeRange, [PLAYERGLOBAL.AGE.MIN, PLAYERGLOBAL.AGE.MAX])
  birthdate: string;

  @Expose()
  @IsInt()
  @Min(PLAYERGLOBAL.OVERALL.MIN)
  @Max(PLAYERGLOBAL.OVERALL.MAX)
  overall: number;
}
