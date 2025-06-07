import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import sharp from "sharp";
import axios from "axios";

const validateImage = (srcImage: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    axios
      .get(srcImage, { responseType: "arraybuffer" })
      .then((response) => {
        sharp(response.data)
          .metadata()
          .then(() => resolve(true))
          .catch(() => resolve(false));
      })
      .catch(() => resolve(false));
  });
};

@ValidatorConstraint({ name: "isValidImage", async: true })
export class isValidImage implements ValidatorConstraintInterface {
  async validate(imageUrl: string) {
    const isValid = await validateImage(imageUrl);

    return isValid;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is not a valid image URL`;
  }
}
