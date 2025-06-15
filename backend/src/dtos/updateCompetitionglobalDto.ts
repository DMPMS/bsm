import { Expose } from "class-transformer";
import {
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Validate,
} from "class-validator";
import { COMPETITIONGLOBAL, UUID_VERSION } from "../config/constants";
import { isValidImage } from "../validators/isValidImage";

export class UpdateCompetitionglobalDto {
  @Expose()
  @IsUUID(UUID_VERSION)
  ruleId: string;

  @Expose()
  @IsString()
  @Length(COMPETITIONGLOBAL.NAME.MIN, COMPETITIONGLOBAL.NAME.MAX)
  name: string;

  @Expose()
  @IsString()
  @Validate(isValidImage)
  @IsOptional()
  imageUrl?: string | null;

  @Expose()
  @IsString()
  @Length(COMPETITIONGLOBAL.SEASON.MIN, COMPETITIONGLOBAL.SEASON.MAX)
  season: string;
}
