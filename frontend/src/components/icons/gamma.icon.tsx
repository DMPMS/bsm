import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import type { IconPropsType } from "../../types/IconProps.type";
import styles from "./icon.module.css";

const GammaIcon = ({
  size,
  circle = false,
  disabled = false,
  color = "var(--color-gray-1)",
  colorHover = "var(--color-gray-2)",
  colorDisabled = "var(--color-gray-1)",
  className = "",
  cursor = MouseCursorEnum.Pointer,
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
              d="m418.225 4.543c-16.825-9.518-38.178-3.591-47.694 13.233l-94.002 166.204-60.314-110.391c-20.481-37.486-56.202-64.032-98.001-72.831-18.917-3.982-37.475 8.125-41.456 27.041s8.125 37.478 27.04 41.459c21.749 4.577 40.335 18.39 50.992 37.896l86.21 157.791v212.055c0 19.33 15.67 35 35 35s35-15.67 35-35v-211.783l120.459-212.978c9.516-16.825 3.591-38.18-13.234-47.696z"
              className={styles.white}
            />
          </g>
        </>
      ) : (
        <>
          <path
            d="m418.225 4.543c-16.825-9.518-38.178-3.591-47.694 13.233l-94.002 166.204-60.314-110.391c-20.481-37.486-56.202-64.032-98.001-72.831-18.917-3.982-37.475 8.125-41.456 27.041s8.125 37.478 27.04 41.459c21.749 4.577 40.335 18.39 50.992 37.896l86.21 157.791v212.055c0 19.33 15.67 35 35 35s35-15.67 35-35v-211.783l120.459-212.978c9.516-16.825 3.591-38.18-13.234-47.696z"
            className={styles.path}
          />
        </>
      )}
    </svg>
  );
};

export default GammaIcon;
