import { Expose } from "class-transformer";
import {
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Validate,
} from "class-validator";
import { isValidImage } from "../validators/isValidImage";
import { TEAMGLOBAL } from "../config/constants";

export class CreateTeamglobalDto {
  @Expose()
  @IsUUID()
  countryId: string;

  @Expose()
  @IsUUID()
  managerglobalId: string;

  @Expose()
  @IsString()
  @Length(TEAMGLOBAL.NAME.MIN, TEAMGLOBAL.NAME.MAX)
  name: string;

  @Expose()
  @IsString()
  @Length(TEAMGLOBAL.ABBREVIATION.MIN, TEAMGLOBAL.ABBREVIATION.MAX)
  abbreviation: string;

  @Expose()
  @IsString()
  @Validate(isValidImage)
  @IsOptional()
  imageUrl?: string | null;
}
