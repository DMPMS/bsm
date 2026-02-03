import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import type { IconPropsType } from "../../types/IconProps.type";
import styles from "./icon.module.css";

const FastForwardIcon = ({
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
      viewBox="0 0 330 330"
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
          <circle r="165" cx="165" cy="165" className={styles.path} />

          <g transform="matrix(0.6,0,0,0.6,76,66)">
            <path
              d="M175.606,4.394c-4.289-4.291-10.743-5.572-16.347-3.252C153.654,3.463,150,8.933,150,15v113.788
	L25.606,4.394C21.317,0.103,14.864-1.179,9.26,1.142C3.654,3.463,0,8.933,0,15v300c0,6.066,3.654,11.536,9.26,13.857
	c1.855,0.77,3.805,1.143,5.737,1.143c3.903,0,7.74-1.524,10.609-4.394L150,201.214V315c0,6.066,3.654,11.536,9.26,13.857
	c1.855,0.77,3.805,1.143,5.737,1.143c3.903,0,7.74-1.524,10.609-4.394l150-149.999c2.814-2.813,4.394-6.628,4.394-10.606
	s-1.58-7.794-4.394-10.607L175.606,4.394z"
              className={styles.white}
            />
          </g>
        </>
      ) : (
        <>
          <path
            d="M175.606,4.394c-4.289-4.291-10.743-5.572-16.347-3.252C153.654,3.463,150,8.933,150,15v113.788
	L25.606,4.394C21.317,0.103,14.864-1.179,9.26,1.142C3.654,3.463,0,8.933,0,15v300c0,6.066,3.654,11.536,9.26,13.857
	c1.855,0.77,3.805,1.143,5.737,1.143c3.903,0,7.74-1.524,10.609-4.394L150,201.214V315c0,6.066,3.654,11.536,9.26,13.857
	c1.855,0.77,3.805,1.143,5.737,1.143c3.903,0,7.74-1.524,10.609-4.394l150-149.999c2.814-2.813,4.394-6.628,4.394-10.606
	s-1.58-7.794-4.394-10.607L175.606,4.394z"
            className={styles.path}
          />
        </>
      )}
    </svg>
  );
};

export default FastForwardIcon;
