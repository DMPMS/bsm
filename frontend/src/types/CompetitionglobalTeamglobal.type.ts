import type { CompetitionglobalType } from "./Competitionglobal.type";
import type { TeamglobalType } from "./Teamglobal.type";

export interface CompetitionglobalTeamglobalType {
  id: string;

  competitionglobal?: CompetitionglobalType;
  teamglobal?: TeamglobalType;
}
