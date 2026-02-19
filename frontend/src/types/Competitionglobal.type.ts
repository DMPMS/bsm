import type { CompetitionglobalTeamglobalType } from "./CompetitionglobalTeamglobal.type";
import type { RuleType } from "./Rule.type";

export interface CompetitionglobalType {
  id: string;
  name: string;
  imageUrl: string | null;

  rule?: RuleType;
  competitionglobalTeamglobals?: CompetitionglobalTeamglobalType[];
}
