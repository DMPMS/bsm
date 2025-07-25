import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import InfoIcon from "../icons/info.icon";
import styles from "./formGroup.module.css";

interface FormGroupProps {
  label: string;
  required?: boolean;
  tooltip?: string;
  tooltipIcon?: React.ReactNode;
  children: React.ReactNode;
}

const FormGroup = ({
  label,
  required = false,
  tooltip,
  tooltipIcon,
  children,
}: FormGroupProps) => {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>
        <div>
          {label} {required && <span className={styles.asterisk}>*</span>}{" "}
        </div>
        {tooltip && (
          <div title={tooltip} className={styles.tooltipContainer}>
            {tooltipIcon || (
              <InfoIcon size={15} cursor={MouseCursorEnum.Help} />
            )}
          </div>
        )}
      </label>
      {children}
    </div>
  );
};

export default FormGroup;
