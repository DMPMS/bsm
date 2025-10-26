import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import type { IconPropsType } from "../../types/IconProps.type";
import styles from "./icon.module.css";

const TeamIcon = ({
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
        d="m166.947 300.913c0 3.005.163 5.971.469 8.896l24.719-7.297 12.994-39.991-13.761-21.08c-15.087 15.304-24.421 36.314-24.421 59.472z"
        className={styles.path}
      />
      <path
        d="m217.726 223.29 13.643 20.899h41.375l14.646-19.915c-20.818-10.262-48.504-10.675-69.664-.984z"
        className={styles.path}
      />
      <path
        d="m340.182 146.27v79.079c36.337 40.296 36.978 109.634 0 151.129v88.468c99.527-72.712 152.351-193.979 144.984-318.676z"
        className={styles.path}
      />
      <path
        d="m308.188 146.27h-113.428v52.749c33.094-19.52 80.335-19.519 113.428 0z"
        className={styles.path}
      />
      <path
        d="m235.821 357.821-34.104-24.778-24.978 7.373c11.871 22.453 33.52 38.934 59.229 43.732z"
        className={styles.path}
      />
      <path
        d="m485.166 114.276v-93.62c0-11.408-9.248-20.656-20.655-20.656h-417.011c-11.408 0-20.655 9.248-20.655 20.655v93.62h458.321zm-56.158-74.097c8.835 0 15.997 7.162 15.997 15.997-.843 21.22-31.155 21.214-31.994 0 0-8.835 7.163-15.997 15.997-15.997zm-68.988 0c8.835 0 15.997 7.162 15.997 15.997-.843 21.22-31.155 21.214-31.994 0 0-8.835 7.163-15.997 15.997-15.997zm-68.987 0c8.835 0 15.997 7.162 15.997 15.997-.843 21.22-31.155 21.214-31.994 0 0-8.835 7.162-15.997 15.997-15.997zm-68.988 0c8.835 0 15.997 7.162 15.997 15.997-.843 21.22-31.155 21.214-31.994 0 0-8.835 7.162-15.997 15.997-15.997zm-68.988 0c8.835 0 15.997 7.162 15.997 15.997-.843 21.22-31.155 21.214-31.994 0 0-8.835 7.162-15.997 15.997-15.997zm-68.988 0c8.835 0 15.997 7.162 15.997 15.997-.843 21.22-31.155 21.214-31.994 0 0-8.835 7.162-15.997 15.997-15.997z"
        className={styles.path}
      />
      <path
        d="m308.188 402.808c-33.094 19.52-80.335 19.52-113.428 0v81.634c11.979 7.529 24.476 14.41 37.469 20.562l10.577 5.008c5.496 2.603 11.86 2.651 17.396.131l14.66-6.672c11.489-5.229 22.602-11.025 33.326-17.331z"
        className={styles.path}
      />
      <path
        d="m279.994 309.359-10.78-33.176h-34.883l-10.78 33.176 28.221 20.505z"
        className={styles.path}
      />
      <path
        d="m162.766 376.478c-39.097-45.556-34.771-110.95 0-151.13v-79.078h-135.921c-7.03 123.572 39.75 239.811 135.921 315.54z"
        className={styles.path}
      />
      <path
        d="m324.704 343.127-23.66-9.514-33.228 24.141.147 26.217c24.236-4.821 44.759-20.061 56.741-40.844z"
        className={styles.path}
      />
      <path
        d="m298.588 263.05 13.116 40.367 23.442 9.426c3.87-25.391-5.158-52.087-21.931-69.682z"
        className={styles.path}
      />
    </svg>
  );
};

export default TeamIcon;
