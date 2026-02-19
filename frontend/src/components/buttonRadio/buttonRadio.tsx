import styles from "./buttonRadio.module.css";

interface Option {
  value: string;
  label: string;
}

interface ButtonRadioProps {
  options: Option[];
  value: string;
  className?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const ButtonRadio = ({
  options,
  value,
  className = "",
  onChange,
  disabled = false,
}: ButtonRadioProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <div key={option.value} className={`${styles.option}`}>
            <button
              type="button"
              className={`${styles.button}
                ${isSelected ? styles.selected : ""}`}
              onClick={() => onChange(option.value)}
              disabled={disabled}
            >
              {option.label}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ButtonRadio;
