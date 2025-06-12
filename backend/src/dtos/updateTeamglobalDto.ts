import { Expose } from "class-transformer";
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

  @Expose()
  @IsArray()
  @IsUUID(UUID_VERSION, { each: true })
  @ArrayMinSize(TEAMGLOBAL.PLAYERGLOBALS.MIN)
  @ArrayMaxSize(TEAMGLOBAL.PLAYERGLOBALS.MAX)
  @Validate(UniqueArray)
  playerglobalIds: string[];
}
