import { IsOptional, IsString, Length, Validate } from "class-validator";
import { Expose } from "class-transformer";
import { USER } from "../config/constants";
import { IsCustomEmail } from "../validators/isCustomEmail";
import { IsCustomDate } from "../validators/isCustomDate";
import { IsDateWithinAgeRange } from "../validators/isDateWithinAgeRange";
import { isValidImage } from "../validators/isValidImage";

export class UpdateUserDto {
  @Expose()
  @IsString()
  @Length(USER.NAME.MIN, USER.NAME.MAX)
  name: string;

  @Expose()
  @IsString()
  @Validate(isValidImage)
  @IsOptional()
  imageUrl: string;

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
