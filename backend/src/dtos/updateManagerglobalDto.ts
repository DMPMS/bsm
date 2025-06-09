import { Expose } from "class-transformer";
import {
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Validate,
} from "class-validator";
import { MANAGERGLOBAL } from "../config/constants";
import { isValidImage } from "../validators/isValidImage";
import { IsCustomDate } from "../validators/isCustomDate";
import { IsDateWithinAgeRange } from "../validators/isDateWithinAgeRange";

export class UpdateManagerglobalDto {
  @Expose()
  @IsUUID()
  countryId: string;

  @Expose()
  @IsString()
  @Length(MANAGERGLOBAL.NAME.MIN, MANAGERGLOBAL.NAME.MAX)
  name: string;

  @Expose()
  @IsString()
  @Validate(isValidImage)
  @IsOptional()
  imageUrl?: string | null;

  @Expose()
  @IsString()
  @Validate(IsCustomDate)
  @Validate(IsDateWithinAgeRange, [
    MANAGERGLOBAL.AGE.MIN,
    MANAGERGLOBAL.AGE.MAX,
  ])
  birthdate: string;
}
