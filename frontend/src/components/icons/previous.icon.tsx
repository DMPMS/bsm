import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import type { IconPropsType } from "../../types/IconProps.type";
import styles from "./icon.module.css";

const PreviousIcon = ({
  size,
  disabled = false,
  color = "var(--color-gray-1)",
  colorHover = "var(--color-gray-2)",
  colorDisabled = "var(--color-gray-1)",
  cursor = MouseCursorEnum.Pointer,
  className = "",
  ...props
}: IconPropsType) => {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={`${styles.svg} ${
        disabled ? styles.svgDisabled : styles.svgEnabled
      } ${className}`}
      style={
        {
          "--color": color,
          "--color-hover": colorHover,
          "--color-disabled": colorDisabled,
          "--cursor": disabled ? MouseCursorEnum.NotAllowed : cursor,
        } as React.CSSProperties
      }
      {...props}
    >
      <g transform="matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,511.9999999999999,511.9999999999999)">
        <path
          d="M256 0C114.511 0 0 114.497 0 256c0 141.49 114.495 256 256 256 141.49 0 256-114.497 256-256C512 114.51 397.503 0 256 0zm92.238 284.418-120.294 69.507a32.823 32.823 0 0 1-49.241-28.417V186.493a32.82 32.82 0 0 1 49.241-28.419l120.295 69.507a32.82 32.82 0 0 1-.001 56.837z"
          className={styles.path}
        />
      </g>
    </svg>
  );
};

export default PreviousIcon;
