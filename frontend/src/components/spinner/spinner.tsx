import styles from "./spinner.module.css";

interface SpinnerProps {
  size: number;
  className?: string;
}

const Spinner = ({ size, className = "", ...props }: SpinnerProps) => {
  return (
    <span
      className={`${styles.spinner} ${className}`}
      style={{ "--size": size } as React.CSSProperties}
      {...props}
    ></span>
  );
};

export default Spinner;
