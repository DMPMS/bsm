import type { LineupDefenseLineEnum } from "../enums/LineupDefenseLine.enum";
import type { LineupFormationEnum } from "../enums/LineupFormation.enum";
import type { LineupIntensityEnum } from "../enums/LineupIntensity.enum";
import type { LineupMarkingStyleEnum } from "../enums/LineupMarkingStyle.enum";
import type { LineupPlayStyleEnum } from "../enums/LineupPlayStyle.enum";
import type { LineupPresetEnum } from "../enums/LineupPreset.enum";
import type { LineupglobalPlayerglobalType } from "./LineupglobalPlayerglobal.type";

export interface LineupglobalType {
  id: string;
  preset: LineupPresetEnum;
  formation: LineupFormationEnum;
  playStyle: LineupPlayStyleEnum;
  markingStyle: LineupMarkingStyleEnum;
  defenseLine: LineupDefenseLineEnum;
  intensity: LineupIntensityEnum;

  lineupglobalPlayerglobals?: LineupglobalPlayerglobalType[];
}
