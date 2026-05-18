import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import type { IconPropsType } from "../../types/IconProps.type";
import styles from "./icon.module.css";

const RadioNotSelectedIcon = ({
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
              d="M437.02,74.981C388.668,26.629,324.38,0,256,0S123.333,26.629,74.981,74.981C26.629,123.333,0,187.621,0,256
			S26.629,388.668,74.981,437.02C123.333,485.371,187.621,512,256.001,512s132.668-26.629,181.019-74.98S512,324.38,512,256.001
			S485.372,123.333,437.02,74.981z M256,446.727c-105.167,0-190.727-85.56-190.727-190.726S150.833,65.273,256,65.273
			s190.727,85.56,190.727,190.727S361.168,446.727,256,446.727z"
              className={styles.white}
            />
          </g>
        </>
      ) : (
        <>
          <path
            d="M437.02,74.981C388.668,26.629,324.38,0,256,0S123.333,26.629,74.981,74.981C26.629,123.333,0,187.621,0,256
			S26.629,388.668,74.981,437.02C123.333,485.371,187.621,512,256.001,512s132.668-26.629,181.019-74.98S512,324.38,512,256.001
			S485.372,123.333,437.02,74.981z M256,446.727c-105.167,0-190.727-85.56-190.727-190.726S150.833,65.273,256,65.273
			s190.727,85.56,190.727,190.727S361.168,446.727,256,446.727zz"
            className={styles.path}
          />
        </>
      )}
    </svg>
  );
};

export default RadioNotSelectedIcon;
