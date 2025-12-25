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
const LEADING_ZEROS_REGEX = /^0+(\d)/;
const SINGLE_DOT_REGEX = /(\..*)\./g;
const REPLACEMENT_GROUP = "$1";

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
      value = "0" + value;
    }

    if (isInteger) {
      value = value.replace(DIGITS_ONLY_REGEX, "");
      value = value.replace(LEADING_ZEROS_REGEX, REPLACEMENT_GROUP);
    } else {
      value = value
        .replace(DECIMAL_NUMBER_REGEX, "")
        .replace(SINGLE_DOT_REGEX, REPLACEMENT_GROUP);

      if (decimalPrecision > 0 && value.includes(".")) {
        const [integerPart, decimalPart] = value.split(".");
        const integerPartWithoutLeadingZeros = integerPart.replace(
          LEADING_ZEROS_REGEX,
          REPLACEMENT_GROUP
        );
        value =
          integerPartWithoutLeadingZeros +
          "." +
          decimalPart.slice(0, decimalPrecision);
      } else {
        value = value.replace(LEADING_ZEROS_REGEX, REPLACEMENT_GROUP);
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
