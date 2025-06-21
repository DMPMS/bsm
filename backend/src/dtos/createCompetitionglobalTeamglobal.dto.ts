import { Expose } from "class-transformer";
import { IsEnum, IsUUID } from "class-validator";
import { UUID_VERSION } from "../config/constants";
import { RuleCodeEnum } from "../enums/RuleCode.enum";

export class CreateCompetitionglobalTeamglobalDto {
  @Expose()
  @IsUUID(UUID_VERSION)
  competitionglobalId: string;

  @Expose()
  @IsUUID(UUID_VERSION)
  teamglobalId: string;

  @IsEnum(RuleCodeEnum)
  ruleCode: RuleCodeEnum;
}
