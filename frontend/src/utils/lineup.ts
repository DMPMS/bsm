import { LineupFormationEnum } from "../enums/LineupFormation.enum";
import { LineupPlayStyleEnum } from "../enums/LineupPlayStyle.enum";

export const LineupFormationTextMap: Record<LineupFormationEnum, string> = {
  [LineupFormationEnum.F541]: "5-4-1",
  [LineupFormationEnum.F532]: "5-3-2",
  [LineupFormationEnum.F451]: "4-5-1",
  [LineupFormationEnum.F442]: "4-4-2",
  [LineupFormationEnum.F433]: "4-3-3",
  [LineupFormationEnum.F424]: "4-2-4",
  [LineupFormationEnum.F352]: "3-5-2",
  [LineupFormationEnum.F343]: "3-4-3",
  [LineupFormationEnum.F334]: "3-3-4",
};

export const LineupPlayStyleTextMap: Record<LineupPlayStyleEnum, string> = {
  [LineupPlayStyleEnum.TotalAttacking]: "Totalmente Ofensiva",
  [LineupPlayStyleEnum.Attacking]: "Ofensiva",
  [LineupPlayStyleEnum.Balanced]: "Equilibrada",
  [LineupPlayStyleEnum.CounterAttacking]: "Contra-Ataque",
  [LineupPlayStyleEnum.Defensive]: "Defensiva",
  [LineupPlayStyleEnum.TotalDefensive]: "Totalmente Defensiva",
};
