import { Expose } from "class-transformer";
import { IsBoolean, IsUUID } from "class-validator";

export class CreatePlayerglobalPositionDto {
  @Expose()
  @IsUUID()
  playerglobalId: string;

  @Expose()
  @IsUUID()
  positionId: string;

  @Expose()
  @IsBoolean()
  isPrimary: boolean;
}
