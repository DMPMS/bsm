import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import type { IconPropsType } from "../../types/IconProps.type";
import styles from "./icon.module.css";

const PencilIcon = ({
  size,
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
      viewBox="0 0 469.333 469.333"
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
        d="m234.667 0c-129.603 0-234.667 105.064-234.667 234.667s105.064 234.667 234.667 234.667 234.666-105.064 234.666-234.667-105.063-234.667-234.666-234.667zm115.75 194.334-24.094 24.094c-.194.23-.271.521-.491.738-.22.218-.508.297-.738.491l-120.646 120.654c-4.628 4.655-10.431 7.967-16.791 9.585l-40.26 10.082c-2.712.676-5.497 1.019-8.292 1.022-8.182.065-16.052-3.137-21.865-8.896-7.798-7.934-10.803-19.409-7.893-30.146l10.093-40.271c1.608-6.363 4.918-12.167 9.574-16.791l145.973-145.98c12.521-13.374 33.489-14.136 46.948-1.707l30.178 30.189c5.773 5.808 8.981 13.686 8.907 21.875-.093 9.425-3.904 18.431-10.603 25.061z"
        className={styles.path}
      />

      <line
        x1="130"
        y1="270"
        x2="200"
        y2="340"
        strokeWidth="22"
        strokeLinecap="round"
        className={styles.path}
      />
    </svg>
  );
};

export default PencilIcon;
