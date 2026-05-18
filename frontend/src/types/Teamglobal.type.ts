import type { LineupPresetEnum } from "../enums/LineupPreset.enum";
import type { CompetitionglobalTeamglobalType } from "./CompetitionglobalTeamglobal.type";
import type { CountryType } from "./Country.type";
import type { ManagerglobalType } from "./Managerglobal.type";
import type { PlayerglobalType } from "./Playerglobal.type";

export interface TeamglobalType {
  id: string;
  name: string;
  abbreviation: string;
  imageUrl: string | null;
  activeLineupglobalPreset: LineupPresetEnum;

  country?: CountryType;
  managerglobal?: ManagerglobalType;
  playerglobals?: PlayerglobalType[];
  competitionglobalTeamglobals?: CompetitionglobalTeamglobalType[];
}
