import { FieldStateEnum } from "../../enums/FieldState.enum";
import styles from "./input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fieldState?: FieldStateEnum;
  className?: string;
}

const Input = ({
  fieldState = FieldStateEnum.Default,
  className = "",
  ...props
}: InputProps) => {
  return (
    <input
      className={`${styles.input} ${
        fieldState === FieldStateEnum.Invalid
          ? styles.invalidInput
          : fieldState === FieldStateEnum.Warning
            ? styles.warningInput
            : ""
      } ${className}`}
      {...props}
    />
  );
};

export default Input;
