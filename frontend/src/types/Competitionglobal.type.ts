import type { CompetitionglobalTeamglobalType } from "./CompetitionglobalTeamglobal.type";
import type { RuleType } from "./Rule.type";

export interface CompetitionglobalType {
  id: string;
  name: string;
  imageUrl: string | null;
  season: string;

  rule?: RuleType;
  competitionglobalTeamglobals?: CompetitionglobalTeamglobalType[];
}
