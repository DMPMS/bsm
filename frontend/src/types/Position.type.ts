import type { PositionAreaEnum } from "../enums/PositionArea.enum";

export interface PositionType {
  id: string;
  name: string;
  abbreviation: string;
  area: PositionAreaEnum;
  code: number;
}
