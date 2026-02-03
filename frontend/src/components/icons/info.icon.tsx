import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import type { IconPropsType } from "../../types/IconProps.type";
import styles from "./icon.module.css";

const InfoIcon = ({
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
      viewBox="0 0 682.66669 682.66669"
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
            r="341.333345"
            cx="341.333345"
            cy="341.333345"
            className={styles.path}
          />

          <g transform="matrix(0.6,0,0,0.6,136.5333,136.5333)">
            <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
              <g transform="translate(337.8437,105.1748)">
                <path
                  d="m 0,0 h -29.256 v 176.16 c 0,28.997 -23.591,52.588 -52.588,52.588 h -46.852 c -28.997,0 -52.588,-23.591 -52.588,-52.588 0,-27.059 20.544,-49.411 46.853,-52.278 V 0 h -29.256 c -28.997,0 -52.588,-23.591 -52.588,-52.587 0,-28.997 23.591,-52.588 52.588,-52.588 H 0 c 28.997,0 52.587,23.591 52.587,52.588 C 52.587,-23.591 28.997,0 0,0"
                  className={styles.white}
                />
              </g>
              <g transform="translate(256,372.4849)">
                <path
                  d="m 0,0 c 38.464,0 69.757,31.293 69.757,69.758 0,38.464 -31.293,69.757 -69.757,69.757 -38.464,0 -69.757,-31.293 -69.757,-69.757 C -69.757,31.293 -38.464,0 0,0"
                  className={styles.white}
                />
              </g>
            </g>
          </g>
        </>
      ) : (
        <>
          <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
            <g transform="translate(337.8437,105.1748)">
              <path
                d="m 0,0 h -29.256 v 176.16 c 0,28.997 -23.591,52.588 -52.588,52.588 h -46.852 c -28.997,0 -52.588,-23.591 -52.588,-52.588 0,-27.059 20.544,-49.411 46.853,-52.278 V 0 h -29.256 c -28.997,0 -52.588,-23.591 -52.588,-52.587 0,-28.997 23.591,-52.588 52.588,-52.588 H 0 c 28.997,0 52.587,23.591 52.587,52.588 C 52.587,-23.591 28.997,0 0,0"
                className={styles.path}
              />
            </g>
            <g transform="translate(256,372.4849)">
              <path
                d="m 0,0 c 38.464,0 69.757,31.293 69.757,69.758 0,38.464 -31.293,69.757 -69.757,69.757 -38.464,0 -69.757,-31.293 -69.757,-69.757 C -69.757,31.293 -38.464,0 0,0"
                className={styles.path}
              />
            </g>
          </g>
        </>
      )}
    </svg>
  );
};

export default InfoIcon;
