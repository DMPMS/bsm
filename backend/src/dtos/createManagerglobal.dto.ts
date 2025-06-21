import { Expose, Transform } from "class-transformer";
import {
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Validate,
} from "class-validator";
import { MANAGERGLOBAL, UUID_VERSION } from "../config/constants";
import { isValidImage } from "../validators/isValidImage";
import { IsCustomDate } from "../validators/isCustomDate";
import { IsDateWithinAgeRange } from "../validators/isDateWithinAgeRange";

export class CreateManagerglobalDto {
  @Expose()
  @IsUUID(UUID_VERSION)
  countryId: string;

  @Expose()
  @IsString()
  @Length(MANAGERGLOBAL.NAME.MIN, MANAGERGLOBAL.NAME.MAX)
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  name: string;

  @Expose()
  @IsString()
  @Validate(isValidImage)
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsOptional()
  imageUrl?: string | null;

  @Expose()
  @IsString()
  @Validate(IsCustomDate)
  @Validate(IsDateWithinAgeRange, [
    MANAGERGLOBAL.AGE.MIN,
    MANAGERGLOBAL.AGE.MAX,
  ])
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  birthdate: string;
}
