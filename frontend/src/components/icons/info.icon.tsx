import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import type { IconPropsType } from "../../types/IconProps.type";
import styles from "./icon.module.css";

const InfoIcon = ({
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
      <path
        d="M256,0C114.509,0,0,114.496,0,256c0,141.489,114.496,256,256,256c141.491,0,256-114.496,256-256
          C512,114.511,397.504,0,256,0z M282.289,357.621c0,8.088-11.794,16.174-26.284,16.174c-15.164,0-25.946-8.086-25.946-16.174
          V229.234c0-9.435,10.783-15.839,25.946-15.839c14.49,0,26.284,6.404,26.284,15.839V357.621z M256.006,182.396
          c-15.501,0-27.631-11.457-27.631-24.263c0-12.805,12.131-23.925,27.631-23.925c15.164,0,27.296,11.12,27.296,23.925
          C283.302,170.939,271.169,182.396,256.006,182.396z"
        className={styles.path}
      />
    </svg>
  );
};

export default InfoIcon;
