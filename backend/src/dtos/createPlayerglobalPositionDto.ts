import { Expose } from "class-transformer";
import { IsBoolean, IsUUID } from "class-validator";
import { UUID_VERSION } from "../config/constants";

export class CreatePlayerglobalPositionDto {
  @Expose()
  @IsUUID(UUID_VERSION)
  playerglobalId: string;

  @Expose()
  @IsUUID(UUID_VERSION)
  positionId: string;

  @Expose()
  @IsBoolean()
  isPrimary: boolean;
}
