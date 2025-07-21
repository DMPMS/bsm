import { useEffect, useState } from "react";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { SignUpDto } from "../dtos/signUp.dto";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { USER } from "../config/constants";
import { jwtDecode } from "jwt-decode";
import { useRequest } from "../utils/request";
import { INITIAL_SIGN_UP_DTO } from "../utils/initialDtos";
import { isValidEmail } from "../utils/isValidEmail";
import {
  GENERAL_FIELD_VALIDATION_MESSAGES,
  OTHER_MESSAGES,
  SIGN_UP_MESSAGES,
  USER_MESSAGES,
} from "../utils/messages";
import type { UserType } from "../types/User.type";
import { MethodEnum } from "../enums/Method.enum";
import { URL_AUTH, URL_USER } from "../config/urls";
import type { AuthType } from "../types/Auth.type";
import { setAuthorizationToken } from "../utils/auth";
import type { TokenType } from "../types/Token.type";
import { useUserReducer } from "../store/reducers/userReducer/useUserReducer";
import { NotificationEnum } from "../enums/Notification.enum";
import { AuthRedirectRoutesEnum } from "../routes/authRedirect.routes";
import { SignInRoutesEnum } from "../routes/signIn.routes";
import { isWithinAgeRange } from "../utils/isWithinAgeRange";
import { useCountry } from "./useCountry";

export const useSignUp = () => {
  const { setUser, setNotification } = useGlobalReducer();
  const { setUsers } = useUserReducer();

  const { loadingCountries, countries } = useCountry();

  const { request, loadingRequest } = useRequest();
  const navigate = useNavigate();

  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [signUp, setSignUp] = useState<SignUpDto>(INITIAL_SIGN_UP_DTO);

  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [warningFields, setWarningFields] = useState<string[]>([]);

  const [countrySelectValidationMessage, setCountrySelectValidationMessage] =
    useState<string>("");

  useEffect(() => {
    if (
      signUp.name.length >= USER.NAME.MIN &&
      signUp.name.length <= USER.NAME.MAX &&
      signUp.birthdate &&
      isWithinAgeRange(signUp.birthdate, USER.AGE.MIN, USER.AGE.MAX) &&
      signUp.email.length >= USER.EMAIL.MIN &&
      signUp.email.length <= USER.EMAIL.MAX &&
      isValidEmail(signUp.email) &&
      signUp.password.length >= USER.PASSWORD.MIN &&
      signUp.password.length <= USER.PASSWORD.MAX &&
      signUp.confirmPassword.length >= USER.CONFIRM_PASSWORD.MIN &&
      signUp.confirmPassword.length <= USER.CONFIRM_PASSWORD.MAX &&
      signUp.password === signUp.confirmPassword
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [signUp]);

  const validateInputField = (
    name: string,
    value: string,
    input: HTMLInputElement
  ) => {
    if (
      ![
        "name",
        "imageUrl",
        "birthdate",
        "email",
        "password",
        "confirmPassword",
      ].includes(name)
    ) {
      return;
    }

    const isValid = () => {
      input.setCustomValidity("");
      setInvalidFields((prev) => prev.filter((item) => item !== name));
      setWarningFields((prev) => prev.filter((item) => item !== name));
    };

    if (!value) {
      input.setCustomValidity(GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED);
      setInvalidFields((prev) => [...prev, name]);

      if (name === "password") {
        const inputConfirmPassword = document.getElementById(
          "confirmPassword"
        ) as HTMLInputElement;

        if (value !== inputConfirmPassword.value) {
          inputConfirmPassword.setCustomValidity(
            USER_MESSAGES.FIELD_VALIDATION.CONFIRM_PASSWORD
              .PASSWORDS_DO_NOT_MATCH
          );
          setInvalidFields((prev) => [...prev, "confirmPassword"]);
        } else {
          inputConfirmPassword.setCustomValidity("");
          setInvalidFields((prev) =>
            prev.filter((item) => item !== "confirmPassword")
          );
          setWarningFields((prev) =>
            prev.filter((item) => item !== "confirmPassword")
          );
        }
      }
    } else if (name === "name") {
      if (value.length < USER.NAME.MIN) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MIN_CHARACTER(USER.NAME.MIN)
        );
        setInvalidFields((prev) => [...prev, name]);
      } else if (value.length > USER.NAME.MAX) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MAX_CHARACTER(USER.NAME.MAX)
        );
        setInvalidFields((prev) => [...prev, name]);
      } else {
        isValid();
      }
    } else if (name === "birthdate") {
      if (!isWithinAgeRange(value, USER.AGE.MIN, USER.AGE.MAX)) {
        input.setCustomValidity(
          USER_MESSAGES.FIELD_VALIDATION.BIRTHDATE(USER.AGE.MIN, USER.AGE.MAX)
        );
        setInvalidFields((prev) => [...prev, name]);
      } else {
        isValid();
      }
    } else if (name === "email") {
      if (value.length < USER.EMAIL.MIN) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MIN_CHARACTER(USER.EMAIL.MIN)
        );
        setInvalidFields((prev) => [...prev, name]);
      } else if (value.length > USER.EMAIL.MAX) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MAX_CHARACTER(USER.NAME.MAX)
        );
        setInvalidFields((prev) => [...prev, name]);
      } else if (!isValidEmail(value)) {
        input.setCustomValidity(
          USER_MESSAGES.FIELD_VALIDATION.EMAIL.EMAIL_IS_INVALID
        );
        setInvalidFields((prev) => [...prev, name]);
      } else {
        isValid();
      }
    } else if (name === "password") {
      if (value.length < USER.PASSWORD.MIN) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MIN_CHARACTER(USER.PASSWORD.MIN)
        );
        setInvalidFields((prev) => [...prev, name]);
      } else if (value.length > USER.PASSWORD.MAX) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MIN_CHARACTER(USER.PASSWORD.MAX)
        );
        setInvalidFields((prev) => [...prev, name]);
      } else {
        isValid();
      }

      const inputConfirmPassword = document.getElementById(
        "confirmPassword"
      ) as HTMLInputElement;

      if (value !== inputConfirmPassword.value) {
        inputConfirmPassword.setCustomValidity(
          USER_MESSAGES.FIELD_VALIDATION.CONFIRM_PASSWORD.PASSWORDS_DO_NOT_MATCH
        );
        setInvalidFields((prev) => [...prev, "confirmPassword"]);
      } else {
        inputConfirmPassword.setCustomValidity("");
        setInvalidFields((prev) =>
          prev.filter((item) => item !== "confirmPassword")
        );
        setWarningFields((prev) =>
          prev.filter((item) => item !== "confirmPassword")
        );
      }
    } else if (name === "confirmPassword") {
      if (value.length < USER.CONFIRM_PASSWORD.MIN) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MIN_CHARACTER(
            USER.CONFIRM_PASSWORD.MIN
          )
        );
        setInvalidFields((prev) => [...prev, name]);
      } else if (value.length > USER.CONFIRM_PASSWORD.MAX) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MAX_CHARACTER(
            USER.CONFIRM_PASSWORD.MAX
          )
        );
        setInvalidFields((prev) => [...prev, name]);
      } else {
        const inputPassword = document.getElementById(
          "password"
        ) as HTMLInputElement;

        if (value !== inputPassword.value) {
          input.setCustomValidity(
            USER_MESSAGES.FIELD_VALIDATION.CONFIRM_PASSWORD
              .PASSWORDS_DO_NOT_MATCH
          );
          setInvalidFields((prev) => [...prev, name]);
        } else {
          isValid();
        }
      }
    } else {
      isValid();
    }

    input.reportValidity();
  };

  const handleOnChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const input = e.target;
    const value = input.value;

    setSignUp({
      ...signUp,
      [name]: name === "email" ? value.toLowerCase() : value,
    });

    validateInputField(name, value, input);
  };

  const handleOnChangeCountrySelect = (value: string) => {
    const newValue = value ? value : undefined;

    setSignUp({
      ...signUp,
      countryId: newValue,
    });

    if (!newValue) {
      setCountrySelectValidationMessage(
        GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED
      );
      setInvalidFields((prev) => [...prev, "countryId"]);
    } else {
      setCountrySelectValidationMessage("");
      setInvalidFields((prev) => prev.filter((item) => item !== "countryId"));
      setWarningFields((prev) => prev.filter((item) => item !== "countryId"));
    }
  };

  const handleOnSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    await request<UserType>({
      method: MethodEnum.Post,
      url: URL_USER,
      body: signUp,
      timeout: 1000,
    })
      .then(async () => {
        await request<AuthType>({
          method: MethodEnum.Post,
          url: URL_AUTH,
          body: {
            email: signUp.email,
            password: signUp.password,
          },
          timeout: 0,
        })
          .then((data) => {
            setAuthorizationToken(data.token);

            const decodedToken = jwtDecode<TokenType>(data.token.split(" ")[1]);

            setUser(decodedToken.user);

            setUsers([]);

            setNotification({
              message: SIGN_UP_MESSAGES.SUCCESS.WELCOME(
                decodedToken.user.name.split(" ")[0]
              ),
              type: NotificationEnum.Success,
            });

            navigate(AuthRedirectRoutesEnum.AuthRedirect);
          })
          .catch((error: AxiosError) => {
            const responseErrorMessage =
              (error.response?.data as string) || OTHER_MESSAGES.DEFAULT_ERROR;

            setNotification({
              message: responseErrorMessage,
              type: NotificationEnum.Error,
            });
          });
      })
      .catch((error: AxiosError) => {
        const responseErrorMessage =
          (error.response?.data as string) || OTHER_MESSAGES.DEFAULT_ERROR;

        setNotification({
          message: responseErrorMessage,
          type: NotificationEnum.Error,
        });
      });
  };

  const handleOnReset = () => {
    setSignUp(INITIAL_SIGN_UP_DTO);
    setInvalidFields([]);
    setWarningFields([]);
  };

  const handleOnSignIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(SignInRoutesEnum.SignIn);
  };

  return {
    signUp,
    loadingRequest,
    disabledButton,
    invalidFields,
    warningFields,
    countrySelectValidationMessage,
    loadingCountries,
    countries,
    handleOnChangeInput,
    handleOnChangeCountrySelect,
    handleOnSignUp,
    handleOnSignIn,
    handleOnReset,
  };
};
