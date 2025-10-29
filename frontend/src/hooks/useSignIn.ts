import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { useEffect, useState } from "react";
import { useUserReducer } from "../store/reducers/userReducer/useUserReducer";
import { jwtDecode } from "jwt-decode";
import { useRequest } from "../utils/request";
import type { SignInDto } from "../dtos/signIn.dto";
import { INITIAL_SIGN_IN_DTO } from "../utils/initialDtos";
import { isValidEmail } from "../utils/isValidEmail";
import {
  GENERAL_FIELD_VALIDATION_MESSAGES,
  OTHER_MESSAGES,
  SIGN_IN_MESSAGES,
} from "../utils/messages";
import type { AuthType } from "../types/Auth.type";
import { MethodEnum } from "../enums/Method.enum";
import { setAuthorizationToken } from "../utils/auth";
import { URL_AUTH } from "../config/urls";
import type { TokenType } from "../types/Token.type";
import { NotificationEnum } from "../enums/Notification.enum";
import { AuthRedirectRoutesEnum } from "../routes/authRedirect.routes";
import type { AxiosError } from "axios";
import { SignUpRoutesEnum } from "../routes/signUp.routes";

export const useSignIn = () => {
  const { setUser, setNotification } = useGlobalReducer();
  const { setUsers } = useUserReducer();

  const { request, loadingRequest } = useRequest();
  const navigate = useNavigate();

  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [signIn, setSignIn] = useState<SignInDto>(INITIAL_SIGN_IN_DTO);

  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [warningFields, setWarningFields] = useState<string[]>([]);

  useEffect(() => {
    if (signIn.email && signIn.password && isValidEmail(signIn.email)) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [signIn]);

  const validateInputField = (
    id: string,
    value: string,
    input: HTMLInputElement
  ) => {
    if (!["email", "password"].includes(id)) {
      return;
    }

    const isValid = () => {
      input.setCustomValidity("");
      setInvalidFields((prev) => prev.filter((item) => item !== id));
      setWarningFields((prev) => prev.filter((item) => item !== id));
    };

    if (!value) {
      input.setCustomValidity(GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED);
      setInvalidFields((prev) => [...prev, id]);
    } else if (id === "email") {
      if (!isValidEmail(value)) {
        input.setCustomValidity(
          SIGN_IN_MESSAGES.FIELD_VALIDATION.EMAIL_IS_INVALID
        );
        setInvalidFields((prev) => [...prev, id]);
      } else {
        isValid();
      }
    } else {
      isValid();
    }

    input.reportValidity();
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const input = e.target;
    const value = input.value;

    setSignIn({
      ...signIn,
      [name]: name === "email" ? value.toLowerCase() : value,
    });

    validateInputField(name, value, input);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    await request<AuthType>({
      method: MethodEnum.Post,
      url: URL_AUTH,
      body: signIn,
      timeout: 1000,
    })
      .then((data) => {
        setAuthorizationToken(data.token);

        const decodedToken = jwtDecode<TokenType>(data.token.split(" ")[1]);

        setUser(decodedToken.user);

        setUsers([]);

        setNotification({
          message: SIGN_IN_MESSAGES.SUCCESS.WELCOME(
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
  };

  const handleSignUp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(SignUpRoutesEnum.SignUp);
  };

  return {
    loadingRequest,
    disabledButton,
    invalidFields,
    warningFields,
    handleChangeInput,
    handleSignIn,
    handleSignUp,
  };
};
