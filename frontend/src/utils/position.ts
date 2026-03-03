import { PositionAreaEnum } from "../enums/PositionArea.enum";
import { PositionCodeEnum } from "../enums/PositionCode.enum";
import { PositionRatingEnum } from "../enums/PositionRating.enum";
import type { PositionType } from "../types/Position.type";

export const calculateOverallByPosition = (
  overall: number,
  position: PositionType,
  primaryPositionCodes: PositionCodeEnum[],
  secondaryPositionCodes: PositionCodeEnum[],
): number => {
  if (primaryPositionCodes.includes(position.code)) {
    return overall * PositionRatingEnum.Primary;
  } else if (secondaryPositionCodes.includes(position.code)) {
    return overall * PositionRatingEnum.Secondary;
  } else if (
    primaryPositionCodes.some(
      (positionCode) =>
        positionAreaByPositionCode(positionCode) === position.area,
    )
  ) {
    return overall * PositionRatingEnum.SameAreaPrimary;
  } else if (
    secondaryPositionCodes.some(
      (positionCode) =>
        positionAreaByPositionCode(positionCode) === position.area,
    )
  ) {
    return overall * PositionRatingEnum.SameAreaSecondary;
  } else if (position.code === PositionCodeEnum.Goalkeeper) {
    return overall * PositionRatingEnum.NonPlayingGoalkeeper;
  } else {
    return overall * PositionRatingEnum.NonPlaying;
  }
};

export const positionAreaByPositionCode = (
  code: PositionCodeEnum,
): PositionAreaEnum => {
  switch (code) {
    case PositionCodeEnum.Striker:
    case PositionCodeEnum.SecondStriker:
    case PositionCodeEnum.RightWinger:
    case PositionCodeEnum.LeftWinger:
      return PositionAreaEnum.Attack;
    case PositionCodeEnum.AttackingMidfielder:
    case PositionCodeEnum.RightMidfielder:
    case PositionCodeEnum.LeftMidfielder:
    case PositionCodeEnum.CentralMidfielder:
    case PositionCodeEnum.DefensiveMidfielder:
      return PositionAreaEnum.Midfield;
    case PositionCodeEnum.RightBack:
    case PositionCodeEnum.LeftBack:
    case PositionCodeEnum.CenterBack:
      return PositionAreaEnum.Defense;
    case PositionCodeEnum.Goalkeeper:
      return PositionAreaEnum.Goalkeeper;
  }
};
