import { Expose, Transform } from "class-transformer";
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

export class UpdateCompetitionglobalDto {
  @Expose()
  @IsString()
  @Length(COMPETITIONGLOBAL.NAME.MIN, COMPETITIONGLOBAL.NAME.MAX)
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  name: string;

  @Expose()
  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @Validate(isValidImage)
  @IsOptional()
  imageUrl?: string | null;

  @Expose()
  @IsArray()
  @IsUUID(UUID_VERSION, { each: true })
  @ArrayNotEmpty()
  @Validate(UniqueArray)
  teamglobalIds: string[];
}
