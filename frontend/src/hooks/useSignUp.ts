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
import { validateImage } from "../utils/validateImage";
import type { FieldStatusType } from "../types/FieldStatus.type";
import { FieldStateEnum } from "../enums/FieldState.enum";

export const useSignUp = () => {
  const { setUser, setNotification } = useGlobalReducer();
  const { setUsers } = useUserReducer();

  const { loadingCountries, countries } = useCountry();

  const { request, loadingRequest } = useRequest();
  const navigate = useNavigate();

  const [isValidImage, setIsValidImage] = useState<boolean>(true);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [signUp, setSignUp] = useState<SignUpDto>(INITIAL_SIGN_UP_DTO);

  const [fieldsStatus, setFieldsStatus] = useState<FieldStatusType[]>([]);

  const [birthdateInputValidationMessage, setBirthdateInputValidationMessage] =
    useState<string>("");
  const [countrySelectValidationMessage, setCountrySelectValidationMessage] =
    useState<string>("");

  useEffect(() => {
    if (
      signUp.name.length >= USER.NAME.MIN &&
      signUp.name.length <= USER.NAME.MAX &&
      isValidImage &&
      signUp.birthdate &&
      isWithinAgeRange(signUp.birthdate, USER.AGE.MIN, USER.AGE.MAX) &&
      signUp.email.length >= USER.EMAIL.MIN &&
      signUp.email.length <= USER.EMAIL.MAX &&
      isValidEmail(signUp.email) &&
      signUp.countryId &&
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
  }, [signUp, isValidImage]);

  const validateInputField = (
    id: string,
    value: string,
    input: HTMLInputElement,
  ) => {
    if (!["name", "email", "password", "confirmPassword"].includes(id)) {
      return;
    }

    const isValid = () => {
      input.setCustomValidity("");
      setFieldsStatus((prev) => prev.filter((item) => item.id !== id));
    };

    if (!value) {
      input.setCustomValidity(GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED);
      setFieldsStatus((prev) => [
        ...prev,
        { id: id, state: FieldStateEnum.Invalid },
      ]);

      if (id === "password") {
        const inputConfirmPassword = document.getElementById(
          "confirmPassword",
        ) as HTMLInputElement;

        if (value !== inputConfirmPassword.value) {
          inputConfirmPassword.setCustomValidity(
            USER_MESSAGES.FIELD_VALIDATION.CONFIRM_PASSWORD
              .PASSWORDS_DO_NOT_MATCH,
          );
          setFieldsStatus((prev) => [
            ...prev,
            { id: "confirmPassword", state: FieldStateEnum.Invalid },
          ]);
        } else {
          inputConfirmPassword.setCustomValidity("");
          setFieldsStatus((prev) =>
            prev.filter((item) => item.id !== "confirmPassword"),
          );
        }
      }
    } else if (id === "name") {
      if (value.length < USER.NAME.MIN) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MIN_CHARACTER(USER.NAME.MIN),
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: id, state: FieldStateEnum.Invalid },
        ]);
      } else if (value.length > USER.NAME.MAX) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MAX_CHARACTER(USER.NAME.MAX),
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: id, state: FieldStateEnum.Invalid },
        ]);
      } else {
        isValid();
      }
    } else if (id === "email") {
      if (value.length < USER.EMAIL.MIN) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MIN_CHARACTER(USER.EMAIL.MIN),
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: id, state: FieldStateEnum.Invalid },
        ]);
      } else if (value.length > USER.EMAIL.MAX) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MAX_CHARACTER(USER.NAME.MAX),
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: id, state: FieldStateEnum.Invalid },
        ]);
      } else if (!isValidEmail(value)) {
        input.setCustomValidity(
          USER_MESSAGES.FIELD_VALIDATION.EMAIL.EMAIL_IS_INVALID,
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: id, state: FieldStateEnum.Invalid },
        ]);
      } else {
        isValid();
      }
    } else if (id === "password") {
      if (value.length < USER.PASSWORD.MIN) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MIN_CHARACTER(USER.PASSWORD.MIN),
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: id, state: FieldStateEnum.Invalid },
        ]);
      } else if (value.length > USER.PASSWORD.MAX) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MIN_CHARACTER(USER.PASSWORD.MAX),
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: id, state: FieldStateEnum.Invalid },
        ]);
      } else {
        isValid();
      }

      const inputConfirmPassword = document.getElementById(
        "confirmPassword",
      ) as HTMLInputElement;

      if (value !== inputConfirmPassword.value) {
        inputConfirmPassword.setCustomValidity(
          USER_MESSAGES.FIELD_VALIDATION.CONFIRM_PASSWORD
            .PASSWORDS_DO_NOT_MATCH,
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: "confirmPassword", state: FieldStateEnum.Invalid },
        ]);
      } else {
        inputConfirmPassword.setCustomValidity("");
        setFieldsStatus((prev) =>
          prev.filter((item) => item.id !== "confirmPassword"),
        );
      }
    } else if (id === "confirmPassword") {
      if (value.length < USER.CONFIRM_PASSWORD.MIN) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MIN_CHARACTER(
            USER.CONFIRM_PASSWORD.MIN,
          ),
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: id, state: FieldStateEnum.Invalid },
        ]);
      } else if (value.length > USER.CONFIRM_PASSWORD.MAX) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MAX_CHARACTER(
            USER.CONFIRM_PASSWORD.MAX,
          ),
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: id, state: FieldStateEnum.Invalid },
        ]);
      } else {
        const inputPassword = document.getElementById(
          "password",
        ) as HTMLInputElement;

        if (value !== inputPassword.value) {
          input.setCustomValidity(
            USER_MESSAGES.FIELD_VALIDATION.CONFIRM_PASSWORD
              .PASSWORDS_DO_NOT_MATCH,
          );
          setFieldsStatus((prev) => [
            ...prev,
            { id: id, state: FieldStateEnum.Invalid },
          ]);
        } else {
          isValid();
        }
      }
    } else {
      isValid();
    }

    input.reportValidity();
  };

  const handleChangeInput = async (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    const input = e.target;
    const value = input.value;

    setSignUp({
      ...signUp,
      [name]: name === "email" ? value.toLowerCase() : value,
    });

    if (name === "imageUrl") {
      if (value) {
        const isValid = await validateImage(value);

        if (!isValid) {
          input.setCustomValidity(
            GENERAL_FIELD_VALIDATION_MESSAGES.IMAGE_URL_IS_INVALID,
          );
          setFieldsStatus((prev) => [
            ...prev,
            { id: name, state: FieldStateEnum.Invalid },
          ]);
        } else {
          input.setCustomValidity("");
          setFieldsStatus((prev) => prev.filter((item) => item.id !== name));
        }

        setIsValidImage(isValid);
      } else {
        input.setCustomValidity("");
        setFieldsStatus((prev) => prev.filter((item) => item.id !== name));
        setIsValidImage(true);
      }

      input.reportValidity();
    } else {
      validateInputField(name, value, input);
    }
  };

  const handleChangeBirthdateInput = (value: string) => {
    setSignUp({
      ...signUp,
      birthdate: value,
    });

    if (!value) {
      setBirthdateInputValidationMessage(
        GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED,
      );
      setFieldsStatus((prev) => [
        ...prev,
        { id: "birthdate", state: FieldStateEnum.Invalid },
      ]);
    } else if (!isWithinAgeRange(value, USER.AGE.MIN, USER.AGE.MAX)) {
      setBirthdateInputValidationMessage(
        GENERAL_FIELD_VALIDATION_MESSAGES.BIRTHDATE(USER.AGE.MIN, USER.AGE.MAX),
      );
      setFieldsStatus((prev) => [
        ...prev,
        { id: "birthdate", state: FieldStateEnum.Invalid },
      ]);
    } else {
      setBirthdateInputValidationMessage("");
      setFieldsStatus((prev) => prev.filter((item) => item.id !== "birthdate"));
    }
  };

  const handleChangeCountrySelect = (value: string) => {
    const newValue = value ? value : undefined;

    setSignUp({
      ...signUp,
      countryId: newValue,
    });

    if (!newValue) {
      setCountrySelectValidationMessage(
        GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED,
      );
      setFieldsStatus((prev) => [
        ...prev,
        { id: "countryId", state: FieldStateEnum.Invalid },
      ]);
    } else {
      setCountrySelectValidationMessage("");
      setFieldsStatus((prev) => prev.filter((item) => item.id !== "countryId"));
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
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

            // setUser(decodedToken.user);
            console.log(decodedToken.user);

            setUsers([]);

            setNotification({
              message: SIGN_UP_MESSAGES.SUCCESS.WELCOME(
                decodedToken.user.name.split(" ")[0],
              ),
              type: NotificationEnum.Success,
            });

            // navigate(AuthRedirectRoutesEnum.AuthRedirect);
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

  const handleReset = () => {
    setSignUp(INITIAL_SIGN_UP_DTO);
    setIsValidImage(true);
    setFieldsStatus([]);
    setBirthdateInputValidationMessage("");
    setCountrySelectValidationMessage("");
  };

  const handleSignIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(SignInRoutesEnum.SignIn);
  };

  return {
    signUp,
    loadingRequest,
    disabledButton,
    fieldsStatus,
    birthdateInputValidationMessage,
    countrySelectValidationMessage,
    loadingCountries,
    countries,
    handleChangeInput,
    handleChangeBirthdateInput,
    handleChangeCountrySelect,
    handleSignUp,
    handleSignIn,
    handleReset,
  };
};
