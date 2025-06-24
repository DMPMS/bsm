import {
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Validate,
} from "class-validator";
import { Expose, Transform } from "class-transformer";
import { USER, UUID_VERSION } from "../config/constants";
import { IsCustomEmail } from "../validators/isCustomEmail";
import { IsCustomDate } from "../validators/isCustomDate";
import { IsDateWithinAgeRange } from "../validators/isDateWithinAgeRange";
import { isValidImage } from "../validators/isValidImage";

export class UpdateUserDto {
  @Expose()
  @IsUUID(UUID_VERSION)
  countryId: string;

  @Expose()
  @IsString()
  @Length(USER.NAME.MIN, USER.NAME.MAX)
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  name: string;

  @Expose()
  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @Validate(isValidImage)
  @IsOptional()
  imageUrl?: string | null;

  @Expose()
  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @Validate(IsCustomDate)
  @Validate(IsDateWithinAgeRange, [USER.AGE.MIN, USER.AGE.MAX])
  birthdate: string;

  @Expose()
  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @Validate(IsCustomEmail)
  @Length(USER.EMAIL.MIN, USER.EMAIL.MAX)
  email: string;

  @Expose()
  @IsString()
  @IsOptional()
  @Length(USER.PASSWORD.MIN, USER.PASSWORD.MAX)
  newPassword: string;

  @Expose()
  @IsString()
  @IsOptional()
  @Length(USER.CONFIRM_PASSWORD.MIN, USER.CONFIRM_PASSWORD.MAX)
  confirmNewPassword: string;

  @Expose()
  @IsString()
  password: string;
}
