import type { RuleCodeEnum } from "../enums/RuleCode.enum";
import type { CountryType } from "./Country.type";

export interface RuleType {
  id: string;
  name: string;
  numberOfTeams: number;
  description: string | null;
  defaultCompetitionName: string;
  defaultCompetitionImageUrl: string | null;
  code: RuleCodeEnum;

  country?: CountryType;
}
