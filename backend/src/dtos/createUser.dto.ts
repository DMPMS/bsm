import {
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Validate,
} from "class-validator";
import { Expose } from "class-transformer";
import { USER, UUID_VERSION } from "../config/constants";
import { IsCustomEmail } from "../validators/isCustomEmail";
import { IsCustomDate } from "../validators/isCustomDate";
import { IsDateWithinAgeRange } from "../validators/isDateWithinAgeRange";
import { isValidImage } from "../validators/isValidImage";

export class CreateUserDto {
  @Expose()
  @IsUUID(UUID_VERSION)
  countryId: string;

  @Expose()
  @IsString()
  @Length(USER.NAME.MIN, USER.NAME.MAX)
  name: string;

  @Expose()
  @IsString()
  @Validate(isValidImage)
  @IsOptional()
  imageUrl?: string | null;

  @Expose()
  @IsString()
  @Validate(IsCustomDate)
  @Validate(IsDateWithinAgeRange, [USER.AGE.MIN, USER.AGE.MAX])
  birthdate: string;

  @Expose()
  @IsString()
  @Validate(IsCustomEmail)
  @Length(USER.EMAIL.MIN, USER.EMAIL.MAX)
  email: string;

  @Expose()
  @IsString()
  @Length(USER.PASSWORD.MIN, USER.PASSWORD.MAX)
  password: string;

  @Expose()
  @IsString()
  @Length(USER.CONFIRM_PASSWORD.MIN, USER.CONFIRM_PASSWORD.MAX)
  confirmPassword: string;
}
