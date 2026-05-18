import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import type { IconPropsType } from "../../types/IconProps.type";
import styles from "./icon.module.css";

const BetaIcon = ({
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
              d="m350.788 198.874c16.025-21.151 25.212-47.323 25.212-74.889 0-68.366-55.62-123.985-123.985-123.985-80.513 0-146.015 65.502-146.015 146.015v330.985c0 19.33 15.67 35 35 35s35-15.67 35-35v-72.393c22.156 13.565 48.188 21.393 76.015 21.393h29.985c68.374 0 124-55.626 124-124 0-42.946-21.945-80.863-55.212-103.126zm-68.788 157.126h-29.985c-41.915 0-76.015-34.1-76.015-76.015v-133.97c0-41.915 34.1-76.015 76.015-76.015 29.767 0 53.985 24.218 53.985 53.985 0 21.229-12.515 40.562-31.884 49.254l-17.446 7.829c-15.059 6.758-23.35 23.118-19.895 39.259s17.719 27.673 34.225 27.673h11c29.776 0 54 24.225 54 54s-24.224 54-54 54z"
              className={styles.white}
            />
          </g>
        </>
      ) : (
        <>
          <path
            d="m350.788 198.874c16.025-21.151 25.212-47.323 25.212-74.889 0-68.366-55.62-123.985-123.985-123.985-80.513 0-146.015 65.502-146.015 146.015v330.985c0 19.33 15.67 35 35 35s35-15.67 35-35v-72.393c22.156 13.565 48.188 21.393 76.015 21.393h29.985c68.374 0 124-55.626 124-124 0-42.946-21.945-80.863-55.212-103.126zm-68.788 157.126h-29.985c-41.915 0-76.015-34.1-76.015-76.015v-133.97c0-41.915 34.1-76.015 76.015-76.015 29.767 0 53.985 24.218 53.985 53.985 0 21.229-12.515 40.562-31.884 49.254l-17.446 7.829c-15.059 6.758-23.35 23.118-19.895 39.259s17.719 27.673 34.225 27.673h11c29.776 0 54 24.225 54 54s-24.224 54-54 54z"
            className={styles.path}
          />
        </>
      )}
    </svg>
  );
};

export default BetaIcon;
