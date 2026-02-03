import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import type { IconPropsType } from "../../types/IconProps.type";
import styles from "./icon.module.css";

const MenuIcon = ({
  size,
  circle = false,
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
      {circle ? (
        <>
          <circle r="256" cx="256" cy="256" className={styles.path} />

          <g transform={"matrix(0.6,0,0,0.6,102.4,102.4)"}>
            <path
              d="M464.883 64.267H47.117C21.137 64.267 0 85.403 0 111.416c0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.013-21.137-47.149-47.117-47.149zM464.883 208.867H47.117C21.137 208.867 0 230.003 0 256.016c0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.013-21.137-47.149-47.117-47.149zM464.883 353.467H47.117C21.137 353.467 0 374.604 0 400.616c0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.012-21.137-47.149-47.117-47.149z"
              className={styles.white}
              transform="matrix(1 0 0 1.35 0 -90)"
            />
          </g>
        </>
      ) : (
        <>
          <path
            d="M464.883 64.267H47.117C21.137 64.267 0 85.403 0 111.416c0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.013-21.137-47.149-47.117-47.149zM464.883 208.867H47.117C21.137 208.867 0 230.003 0 256.016c0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.013-21.137-47.149-47.117-47.149zM464.883 353.467H47.117C21.137 353.467 0 374.604 0 400.616c0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.012-21.137-47.149-47.117-47.149z"
            className={styles.path}
            transform="matrix(1 0 0 1.35 0 -90)"
          />
        </>
      )}
    </svg>
  );
};

export default MenuIcon;
