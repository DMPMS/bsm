import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import type { IconPropsType } from "../../types/IconProps.type";
import styles from "./icon.module.css";

const TrashIcon = ({
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
              d="M436,60h-89.185l-9.75-29.238C330.927,12.363,313.773,0,294.379,0h-76.758c-19.395,0-36.548,12.363-42.7,30.762
			L165.182,60H76c-24.814,0-45,20.186-45,45v30c0,16.708,15.041,15,31.183,15c138.554,0,264.175,0,403.817,0c8.291,0,15-6.709,15-15
			v-30C481,80.186,460.814,60,436,60z M196.813,60l6.57-19.746C205.434,34.116,211.161,30,217.621,30h76.758
			c6.46,0,12.188,4.116,14.224,10.254L315.18,60H196.813z"
              className={styles.white}
            />
            <path
              d="M64.666,182l23.917,289.072C90.707,494.407,109.97,512,133.393,512h245.215c23.423,0,42.686-17.593,44.824-41.06
			L447.336,182H64.666z M181,437c0,19.773-30,19.854-30,0V227c0-19.773,30-19.854,30,0V437z M271,437c0,19.773-30,19.854-30,0V227
			c0-19.773,30-19.854,30,0V437z M361,437c0,19.773-30,19.854-30,0V227c0-8.291,6.709-15,15-15c8.291,0,15,6.709,15,15V437z"
              className={styles.white}
            />
          </g>
        </>
      ) : (
        <>
          <path
            d="M436,60h-89.185l-9.75-29.238C330.927,12.363,313.773,0,294.379,0h-76.758c-19.395,0-36.548,12.363-42.7,30.762
			L165.182,60H76c-24.814,0-45,20.186-45,45v30c0,16.708,15.041,15,31.183,15c138.554,0,264.175,0,403.817,0c8.291,0,15-6.709,15-15
			v-30C481,80.186,460.814,60,436,60z M196.813,60l6.57-19.746C205.434,34.116,211.161,30,217.621,30h76.758
			c6.46,0,12.188,4.116,14.224,10.254L315.18,60H196.813z"
            className={styles.path}
          />
          <path
            d="M64.666,182l23.917,289.072C90.707,494.407,109.97,512,133.393,512h245.215c23.423,0,42.686-17.593,44.824-41.06
			L447.336,182H64.666z M181,437c0,19.773-30,19.854-30,0V227c0-19.773,30-19.854,30,0V437z M271,437c0,19.773-30,19.854-30,0V227
			c0-19.773,30-19.854,30,0V437z M361,437c0,19.773-30,19.854-30,0V227c0-8.291,6.709-15,15-15c8.291,0,15,6.709,15,15V437z"
            className={styles.path}
          />
        </>
      )}
    </svg>
  );
};

export default TrashIcon;
