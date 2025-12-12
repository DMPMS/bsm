import { FieldStateEnum } from "../enums/FieldState.enum";
import type { FieldStatusType } from "../types/FieldStatus.type";

export const getFieldState = (
  id: string,
  fieldsStatus: FieldStatusType[]
): FieldStateEnum => {
  if (
    fieldsStatus.some(
      (item) => item.id === id && item.state === FieldStateEnum.Invalid
    )
  ) {
    return FieldStateEnum.Invalid;
  } else if (
    fieldsStatus.some(
      (item) => item.id === id && item.state === FieldStateEnum.Warning
    )
  ) {
    return FieldStateEnum.Warning;
  } else {
    return FieldStateEnum.Default;
  }
};
