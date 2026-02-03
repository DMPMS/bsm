import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import InfoIcon from "../icons/info.icon";
import styles from "./formGroup.module.css";

interface FormGroupProps {
  label: string;
  required?: boolean;
  tooltip?: string;
  tooltipContent?: React.ReactNode;
  tooltipCursor?: MouseCursorEnum;
  children: React.ReactNode;
}

const FormGroup = ({
  label,
  required = false,
  tooltip,
  tooltipContent,
  tooltipCursor = MouseCursorEnum.Help,
  children,
}: FormGroupProps) => {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>
        <div>
          {label} {required && <span className={styles.asterisk}>*</span>}{" "}
        </div>
        {tooltip && (
          <div
            title={tooltip}
            className={styles.tooltipContainer}
            style={
              {
                "--cursor": tooltipCursor,
              } as React.CSSProperties
            }
          >
            {tooltipContent || (
              <InfoIcon size={15} circle={true} cursor={tooltipCursor} />
            )}
          </div>
        )}
      </label>
      {children}
    </div>
  );
};

export default FormGroup;
