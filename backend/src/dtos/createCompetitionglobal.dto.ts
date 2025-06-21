import { Expose } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Validate,
} from "class-validator";
import { COMPETITIONGLOBAL, UUID_VERSION } from "../config/constants";
import { isValidImage } from "../validators/isValidImage";
import { UniqueArray } from "../validators/uniqueArray";

export class CreateCompetitionglobalDto {
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

  @Expose()
  @IsArray()
  @IsUUID(UUID_VERSION, { each: true })
  @ArrayNotEmpty()
  @Validate(UniqueArray)
  teamglobalIds: string[];
}
