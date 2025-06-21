import { IsString, Validate } from "class-validator";
import { Expose } from "class-transformer";
import { IsCustomEmail } from "../validators/isCustomEmail";

export class SignInDto {
  @Expose()
  @IsString()
  @Validate(IsCustomEmail)
  email: string;

  @Expose()
  @IsString()
  password: string;
}
