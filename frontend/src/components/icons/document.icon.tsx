import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import type { IconPropsType } from "../../types/IconProps.type";
import styles from "./icon.module.css";

const DocumentIcon = ({
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
            <polygon
              points="322.783,9.783 322.783,133.565 446.565,133.565"
              className={styles.white}
            />
            <path
              d="M306.087,166.957c-9.217,0-16.696-7.479-16.696-16.696V0H72.348c-9.217,0-16.696,7.479-16.696,16.696v478.609
			c0,9.217,7.479,16.696,16.696,16.696h367.304c9.217,0,16.696-7.479,16.696-16.696V166.957H306.087z M272.696,411.826H139.13
			c-9.217,0-16.696-7.479-16.696-16.696s7.479-16.696,16.696-16.696h133.565c9.217,0,16.696,7.479,16.696,16.696
			S281.913,411.826,272.696,411.826z M372.87,345.043H139.13c-9.217,0-16.696-7.479-16.696-16.696s7.479-16.696,16.696-16.696
			H372.87c9.217,0,16.696,7.479,16.696,16.696S382.087,345.043,372.87,345.043z M372.87,278.261H139.13
			c-9.217,0-16.696-7.479-16.696-16.696c0-9.217,7.479-16.696,16.696-16.696H372.87c9.217,0,16.696,7.479,16.696,16.696
			C389.565,270.782,382.087,278.261,372.87,278.261z"
              className={styles.white}
            />
          </g>
        </>
      ) : (
        <>
          <polygon
            points="322.783,9.783 322.783,133.565 446.565,133.565"
            className={styles.path}
          />
          <path
            d="M306.087,166.957c-9.217,0-16.696-7.479-16.696-16.696V0H72.348c-9.217,0-16.696,7.479-16.696,16.696v478.609
			c0,9.217,7.479,16.696,16.696,16.696h367.304c9.217,0,16.696-7.479,16.696-16.696V166.957H306.087z M272.696,411.826H139.13
			c-9.217,0-16.696-7.479-16.696-16.696s7.479-16.696,16.696-16.696h133.565c9.217,0,16.696,7.479,16.696,16.696
			S281.913,411.826,272.696,411.826z M372.87,345.043H139.13c-9.217,0-16.696-7.479-16.696-16.696s7.479-16.696,16.696-16.696
			H372.87c9.217,0,16.696,7.479,16.696,16.696S382.087,345.043,372.87,345.043z M372.87,278.261H139.13
			c-9.217,0-16.696-7.479-16.696-16.696c0-9.217,7.479-16.696,16.696-16.696H372.87c9.217,0,16.696,7.479,16.696,16.696
			C389.565,270.782,382.087,278.261,372.87,278.261z"
            className={styles.path}
          />
        </>
      )}
    </svg>
  );
};

export default DocumentIcon;
