import { Expose, Transform } from "class-transformer";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Validate,
} from "class-validator";
import { isValidImage } from "../validators/isValidImage";
import { TEAMGLOBAL, UUID_VERSION } from "../config/constants";
import { UniqueArray } from "../validators/uniqueArray";

export class UpdateTeamglobalDto {
  @Expose()
  @IsUUID(UUID_VERSION)
  countryId: string;

  @Expose()
  @IsUUID(UUID_VERSION)
  managerglobalId: string;

  @Expose()
  @IsString()
  @Length(TEAMGLOBAL.NAME.MIN, TEAMGLOBAL.NAME.MAX)
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  name: string;

  @Expose()
  @IsString()
  @Length(TEAMGLOBAL.ABBREVIATION.MIN, TEAMGLOBAL.ABBREVIATION.MAX)
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  abbreviation: string;

  @Expose()
  @IsString()
  @Validate(isValidImage)
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsOptional()
  imageUrl?: string | null;

  @Expose()
  @IsArray()
  @IsUUID(UUID_VERSION, { each: true })
  @ArrayMinSize(TEAMGLOBAL.PLAYERGLOBALS.MIN)
  @ArrayMaxSize(TEAMGLOBAL.PLAYERGLOBALS.MAX)
  @Validate(UniqueArray)
  playerglobalIds: string[];
}
