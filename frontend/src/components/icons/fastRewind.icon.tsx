import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import type { IconPropsType } from "../../types/IconProps.type";
import styles from "./icon.module.css";

const FastRewindIcon = ({
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
      <g transform="matrix(-1,-1.2246467991473532e-16,1.2246467991473532e-16,-1,512,512)">
        <path
          d="M437.02 74.98C388.667 26.628 324.38 0 256 0 114.509 0 0 114.497 0 256c0 141.491 114.497 256 256 256 141.491 0 256-114.497 256-256 0-68.38-26.628-132.667-74.98-181.02zM217.838 311.898l-48.404 32.977c-9.15 6.234-21.718-.268-21.718-11.482V180.811c0-11.192 12.54-17.736 21.718-11.482l48.404 32.978v109.591zm167.086-43.313-111.977 76.29c-9.15 6.234-21.718-.268-21.718-11.482V180.811c0-11.192 12.54-17.736 21.718-11.482l111.977 76.29a13.893 13.893 0 0 1 0 22.966z"
          className={styles.path}
        />
      </g>
    </svg>
  );
};

export default FastRewindIcon;
