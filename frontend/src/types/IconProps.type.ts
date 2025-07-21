export interface IconPropsType extends React.SVGProps<SVGSVGElement> {
  size: number;
  disabled?: boolean;
  color?: string;
  colorHover?: string;
  colorDisabled?: string;
  className?: string;
}
