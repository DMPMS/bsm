import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ name: "uniqueArray", async: false })
export class UniqueArray implements ValidatorConstraintInterface {
  validate(array: any[]) {
    if (!array || array.length === 0) {
      return true;
    }

    const uniqueValues = new Set(array);
    return uniqueValues.size === array.length;
  }

  defaultMessage(args: ValidationArguments) {
    return `The array ${args.property} cannot contain duplicate values`;
  }
}
