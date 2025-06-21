import { Expose, Transform } from "class-transformer";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
  Validate,
} from "class-validator";
import { isValidImage } from "../validators/isValidImage";
import { IsCustomDate } from "../validators/isCustomDate";
import { IsDateWithinAgeRange } from "../validators/isDateWithinAgeRange";
import { PLAYERGLOBAL, UUID_VERSION } from "../config/constants";
import { UniqueArray } from "../validators/uniqueArray";

export class UpdatePlayerglobalDto {
  @Expose()
  @IsUUID(UUID_VERSION)
  countryId: string;

  @Expose()
  @IsString()
  @Length(PLAYERGLOBAL.NAME.MIN, PLAYERGLOBAL.NAME.MAX)
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  name: string;

  @Expose()
  @IsString()
  @Validate(isValidImage)
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsOptional()
  imageUrl?: string | null;

  @Expose()
  @IsString()
  @Validate(IsCustomDate)
  @Validate(IsDateWithinAgeRange, [PLAYERGLOBAL.AGE.MIN, PLAYERGLOBAL.AGE.MAX])
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  birthdate: string;

  @Expose()
  @IsInt()
  @Min(PLAYERGLOBAL.OVERALL.MIN)
  @Max(PLAYERGLOBAL.OVERALL.MAX)
  overall: number;

  @Expose()
  @IsArray()
  @IsUUID(UUID_VERSION, { each: true })
  @ArrayMinSize(PLAYERGLOBAL.PRIMARY_POSITIONS.MIN)
  @ArrayMaxSize(PLAYERGLOBAL.PRIMARY_POSITIONS.MAX)
  @Validate(UniqueArray)
  primaryPositionIds: string[];

  @Expose()
  @IsArray()
  @IsUUID(UUID_VERSION, { each: true })
  @ArrayMinSize(PLAYERGLOBAL.SECONDARY_POSITIONS.MIN)
  @ArrayMaxSize(PLAYERGLOBAL.SECONDARY_POSITIONS.MAX)
  @Validate(UniqueArray)
  secondaryPositionIds: string[];
}
