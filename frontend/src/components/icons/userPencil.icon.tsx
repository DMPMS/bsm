import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import type { IconPropsType } from "../../types/IconProps.type";
import styles from "./icon.module.css";

const UserPencilIcon = ({
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
            <g transform="matrix(0.65,0,0,0.65,4.6,4.6)">
              <path
                d="M256,0c-74.439,0-135,60.561-135,135s60.561,135,135,135s135-60.561,135-135S330.439,0,256,0z"
                className={styles.white}
              />
              <path
                d="M423.966,358.195C387.006,320.667,338.009,300,286,300h-60c-52.008,0-101.006,20.667-137.966,58.195
			C51.255,395.539,31,444.833,31,497c0,8.284,6.716,15,15,15h420c8.284,0,15-6.716,15-15
			C481,444.833,460.745,395.539,423.966,358.195z"
                className={styles.white}
              />
            </g>
          </g>

          <g transform="matrix(0.6,0,0,0.6,102.4,102.4)">
            <g transform="matrix(1.0084,0,0,1.0084,174.6,174.6)">
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
          </g>
        </>
      ) : (
        <>
          <g transform="matrix(0.65,0,0,0.65,4.6,4.6)">
            <path
              d="M256,0c-74.439,0-135,60.561-135,135s60.561,135,135,135s135-60.561,135-135S330.439,0,256,0z"
              className={styles.path}
            />
            <path
              d="M423.966,358.195C387.006,320.667,338.009,300,286,300h-60c-52.008,0-101.006,20.667-137.966,58.195
                  C51.255,395.539,31,444.833,31,497c0,8.284,6.716,15,15,15h420c8.284,0,15-6.716,15-15
                  C481,444.833,460.745,395.539,423.966,358.195z"
              className={styles.path}
            />
          </g>

          <g transform="matrix(1.0084,0,0,1.0084,174.6,174.6)">
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
          </g>
        </>
      )}
    </svg>
  );
};

export default UserPencilIcon;
