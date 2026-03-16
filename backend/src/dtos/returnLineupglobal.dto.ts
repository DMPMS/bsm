import { LineupglobalEntity } from "../entities/lineupglobal.entity";
import { LineupDefenseLineEnum } from "../enums/LineupDefenseLine.enum";
import { LineupFormationEnum } from "../enums/LineupFormation.enum";
import { LineupIntensityEnum } from "../enums/LineupIntensity.enum";
import { LineupMarkingStyleEnum } from "../enums/LineupMarkingStyle.enum";
import { LineupPlayStyleEnum } from "../enums/LineupPlayStyle.enum";
import { LineupPresetEnum } from "../enums/LineupPreset.enum";
import { ReturnLineupglobalPlayerglobalDto } from "./returnLineupglobalPlayerglobal.dto";

export class ReturnLineupglobalDto {
  id: string;
  preset: LineupPresetEnum;
  formation: LineupFormationEnum;
  playStyle: LineupPlayStyleEnum;
  markingStyle: LineupMarkingStyleEnum;
  defenseLine: LineupDefenseLineEnum;
  intensity: LineupIntensityEnum;

  lineupglobalPlayerglobals?: ReturnLineupglobalPlayerglobalDto[];

  constructor(lineupglobalEntity: LineupglobalEntity) {
    this.id = lineupglobalEntity.id;
    this.preset = lineupglobalEntity.preset;
    this.formation = lineupglobalEntity.formation;
    this.playStyle = lineupglobalEntity.playStyle;
    this.markingStyle = lineupglobalEntity.markingStyle;
    this.defenseLine = lineupglobalEntity.defenseLine;
    this.intensity = lineupglobalEntity.intensity;

    this.lineupglobalPlayerglobals =
      lineupglobalEntity.lineupglobalPlayerglobals
        ? lineupglobalEntity.lineupglobalPlayerglobals
            .sort((a, b) => a.spot - b.spot)
            .map(
              (lineupglobalPlayerglobal) =>
                new ReturnLineupglobalPlayerglobalDto(lineupglobalPlayerglobal),
            )
        : undefined;
  }
}
