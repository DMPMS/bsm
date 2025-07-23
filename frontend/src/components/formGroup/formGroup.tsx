import styles from "./formGroup.module.css";

interface FormGroupProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormGroup = ({ label, required = false, children }: FormGroupProps) => {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>
        {label} {required && <span className={styles.asterisk}>*</span>}
      </label>
      {children}
    </div>
  );
};

export default FormGroup;
