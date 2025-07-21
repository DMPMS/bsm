import styles from "./spinner.module.css";

interface SpinnerProps {
  size: number;
  classname?: string;
}

const Spinner = ({ size, classname = "", ...props }: SpinnerProps) => {
  return (
    <span
      className={`${styles.spinner} ${classname}`}
      style={{ "--size": size } as React.CSSProperties}
      {...props}
    ></span>
  );
};

export default Spinner;
