import type { PositionAreaEnum } from "../enums/PositionArea.enum";
import type { PositionCodeEnum } from "../enums/PositionCode.enum";

export interface PositionType {
  id: string;
  name: string;
  abbreviation: string;
  area: PositionAreaEnum;
  code: PositionCodeEnum;
}
