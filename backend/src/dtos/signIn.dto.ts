import { IsString, Validate } from "class-validator";
import { Expose, Transform } from "class-transformer";
import { IsCustomEmail } from "../validators/isCustomEmail";

export class SignInDto {
  @Expose()
  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @Validate(IsCustomEmail)
  email: string;

  @Expose()
  @IsString()
  password: string;
}
