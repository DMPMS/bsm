import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import type { IconPropsType } from "../../types/IconProps.type";
import styles from "./icon.module.css";

const SoccerFieldIcon = ({
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
              d="M422.957,0H372.87v83.478c0,27.619-22.468,50.087-50.087,50.087H189.217c-27.619,0-50.087-22.468-50.087-50.087V0H89.044
			C61.424,0,38.957,22.468,38.957,50.087v189.217h135.248c7.756-38.058,41.48-66.783,81.795-66.783s74.04,28.724,81.795,66.783
			h135.248V50.087C473.043,22.468,450.576,0,422.957,0z"
              className={styles.white}
            />
            <path
              d="M256,205.913c-21.737,0-40.096,14-47.01,33.391h94.02C296.096,219.913,277.737,205.913,256,205.913z"
              className={styles.white}
            />
            <path
              d="M172.522,0v83.478c0,9.206,7.49,16.696,16.696,16.696h133.565c9.206,0,16.696-7.49,16.696-16.696V0H172.522z"
              className={styles.white}
            />
            <path
              d="M337.795,272.696c-7.756,38.058-41.48,66.783-81.795,66.783s-74.04-28.724-81.795-66.783H38.957v189.217
			c0,27.619,22.468,50.087,50.087,50.087h50.087v-83.478c0-27.619,22.468-50.087,50.087-50.087h133.565
			c27.619,0,50.087,22.468,50.087,50.087V512h50.087c27.619,0,50.087-22.468,50.087-50.087V272.696H337.795z"
              className={styles.white}
            />
            <path
              d="M322.783,411.826H189.217c-9.206,0-16.696,7.49-16.696,16.696V512h166.957v-83.478
			C339.478,419.316,331.989,411.826,322.783,411.826z"
              className={styles.white}
            />
            <path
              d="M208.991,272.696c6.913,19.391,25.273,33.391,47.009,33.391s40.096-14,47.01-33.391H208.991z"
              className={styles.white}
            />
          </g>
        </>
      ) : (
        <>
          <path
            d="M422.957,0H372.87v83.478c0,27.619-22.468,50.087-50.087,50.087H189.217c-27.619,0-50.087-22.468-50.087-50.087V0H89.044
			C61.424,0,38.957,22.468,38.957,50.087v189.217h135.248c7.756-38.058,41.48-66.783,81.795-66.783s74.04,28.724,81.795,66.783
			h135.248V50.087C473.043,22.468,450.576,0,422.957,0z"
            className={styles.path}
          />
          <path
            d="M256,205.913c-21.737,0-40.096,14-47.01,33.391h94.02C296.096,219.913,277.737,205.913,256,205.913z"
            className={styles.path}
          />
          <path
            d="M172.522,0v83.478c0,9.206,7.49,16.696,16.696,16.696h133.565c9.206,0,16.696-7.49,16.696-16.696V0H172.522z"
            className={styles.path}
          />
          <path
            d="M337.795,272.696c-7.756,38.058-41.48,66.783-81.795,66.783s-74.04-28.724-81.795-66.783H38.957v189.217
			c0,27.619,22.468,50.087,50.087,50.087h50.087v-83.478c0-27.619,22.468-50.087,50.087-50.087h133.565
			c27.619,0,50.087,22.468,50.087,50.087V512h50.087c27.619,0,50.087-22.468,50.087-50.087V272.696H337.795z"
            className={styles.path}
          />
          <path
            d="M322.783,411.826H189.217c-9.206,0-16.696,7.49-16.696,16.696V512h166.957v-83.478
			C339.478,419.316,331.989,411.826,322.783,411.826z"
            className={styles.path}
          />
          <path
            d="M208.991,272.696c6.913,19.391,25.273,33.391,47.009,33.391s40.096-14,47.01-33.391H208.991z"
            className={styles.path}
          />
        </>
      )}
    </svg>
  );
};

export default SoccerFieldIcon;
