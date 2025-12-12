import { FieldStateEnum } from "../../enums/FieldState.enum";
import Input from "../input/input";

interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placecholder?: string;
  decimalPrecision?: number;
  fieldState?: FieldStateEnum;
}

const getPlaceholder = (decimalPrecision: number) => {
  if (decimalPrecision <= 0) {
    return "0";
  }

  return "0." + "0".repeat(decimalPrecision);
};

const DIGITS_ONLY_REGEX = /[^0-9]/g;
const DECIMAL_NUMBER_REGEX = /[^0-9.]/g;
const SINGLE_DOT_REGEX = /(\..*)\./g;
const SINGLE_DOT_REPLACEMENT = "$1";

const InputNumber = ({
  placeholder,
  decimalPrecision = 2,
  fieldState = FieldStateEnum.Default,
  ...props
}: InputNumberProps) => {
  const isInteger = decimalPrecision <= 0;

  const finalPlaceholder = placeholder
    ? placeholder
    : getPlaceholder(decimalPrecision);

  const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;

    if (value.startsWith(".")) {
      value = value.slice(1);
    }

    if (isInteger) {
      value = value.replace(DIGITS_ONLY_REGEX, "");
    } else {
      value = value
        .replace(DECIMAL_NUMBER_REGEX, "")
        .replace(SINGLE_DOT_REGEX, SINGLE_DOT_REPLACEMENT);

      if (decimalPrecision > 0 && value.includes(".")) {
        const [integerPart, decimalPart] = value.split(".");
        value = integerPart + "." + decimalPart.slice(0, decimalPrecision);
      }
    }

    e.currentTarget.value = value;
  };

  return (
    <Input
      fieldState={fieldState}
      type="text"
      placeholder={finalPlaceholder}
      onInput={handleChangeInput}
      {...props}
    />
  );
};

export default InputNumber;
