import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import type { IconPropsType } from "../../types/IconProps.type";
import styles from "./icon.module.css";

const PencilIcon = ({
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
      viewBox="0 0 330.001 330.001"
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
          <circle
            r="165.0005"
            cx="165.0005"
            cy="165.0005"
            className={styles.path}
          />

          <g transform={"matrix(0.6,0,0,0.6,66.0002,66.0002)"}>
            <path
              d="M105.607,325.607l139.393-139.393L143.788,85.001L4.394,224.394C1.581,227.208,0,231.022,0,235.001v80
		c-0.001,8.284,6.716,15,15,15h80C98.978,330.001,102.792,328.42,105.607,325.607z"
              className={styles.white}
            />
            <path
              d="M325.607,105.607c5.857-5.857,5.858-15.355-0.001-21.213l-80-80c-5.856-5.859-15.354-5.858-21.212,0
		L165,63.788l101.213,101.213L325.607,105.607z"
              className={styles.white}
            />
          </g>
        </>
      ) : (
        <>
          <path
            d="M105.607,325.607l139.393-139.393L143.788,85.001L4.394,224.394C1.581,227.208,0,231.022,0,235.001v80
		c-0.001,8.284,6.716,15,15,15h80C98.978,330.001,102.792,328.42,105.607,325.607z"
            className={styles.path}
          />
          <path
            d="M325.607,105.607c5.857-5.857,5.858-15.355-0.001-21.213l-80-80c-5.856-5.859-15.354-5.858-21.212,0
		L165,63.788l101.213,101.213L325.607,105.607z"
            className={styles.path}
          />
        </>
      )}
    </svg>
  );
};

export default PencilIcon;
