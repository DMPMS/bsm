import { IsString, Validate } from "class-validator";
import { Expose, Transform } from "class-transformer";
import { IsCustomEmail } from "../validators/isCustomEmail";

export class SignInDto {
  @Expose()
  @IsString()
  @Validate(IsCustomEmail)
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  email: string;

  @Expose()
  @IsString()
  password: string;
}
