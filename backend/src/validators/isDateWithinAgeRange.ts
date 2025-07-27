import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { CURRENT_DATE } from "../config/constants";
import { formatDateFromDate } from "../utils/formatDateFromDate";
import { FormatDateEnum } from "../enums/FormatDate.enum";

@ValidatorConstraint({ name: "isDateWithinAgeRange", async: false })
export class IsDateWithinAgeRange implements ValidatorConstraintInterface {
  validate(birthdate: string, args: ValidationArguments) {
    const [minAge, maxAge] = args.constraints as [number, number];

    const [year, month, day] = birthdate.split("-").map(Number);
    const ajustedBirthdate = new Date(year, month - 1, day);

    const minBirthDate = new Date(
      CURRENT_DATE.getFullYear() - maxAge,
      CURRENT_DATE.getMonth(),
      CURRENT_DATE.getDate()
    );

    const maxBirthDate = new Date(
      CURRENT_DATE.getFullYear() - minAge,
      CURRENT_DATE.getMonth(),
      CURRENT_DATE.getDate()
    );

    return ajustedBirthdate >= minBirthDate && ajustedBirthdate <= maxBirthDate;
  }

  defaultMessage(args: ValidationArguments) {
    const [minAge, maxAge] = args.constraints as [number, number];
    return `${
      args.property
    } must result in an age between ${minAge} and ${maxAge} years. The current system date is ${formatDateFromDate(
      CURRENT_DATE,
      FormatDateEnum.MM_DD_YYYY
    )}`;
  }
}
