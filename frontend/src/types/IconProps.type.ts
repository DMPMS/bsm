import type { MouseCursorEnum } from "../enums/MouseCursor.enum";

export interface IconPropsType extends React.SVGProps<SVGSVGElement> {
  size: number;
  circle?: boolean;
  disabled?: boolean;
  color?: string;
  colorHover?: string;
  colorDisabled?: string;
  cursor?: MouseCursorEnum;
  className?: string;
}
