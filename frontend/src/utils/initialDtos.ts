import type { SignInDto } from "../dtos/signIn.dto";
import type { SignUpDto } from "../dtos/signUp.dto";

export const INITIAL_SIGN_IN_DTO: SignInDto = {
  email: "",
  password: "",
};

export const INITIAL_SIGN_UP_DTO: SignUpDto = {
  name: "",
  imageUrl: "",
  email: "",
  birthdate: "",
  password: "",
  confirmPassword: "",

  countryId: undefined,
};
