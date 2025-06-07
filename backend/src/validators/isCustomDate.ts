import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ name: "isCustomDate", async: false })
export class IsCustomDate implements ValidatorConstraintInterface {
  validate(date: string) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(date)) {
      return false;
    }

    const [year, month, day] = date.split("-").map(Number);

    if (month < 1 || month > 12) {
      return false;
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be in the format 'YYYY-MM-DD'`;
  }
}
