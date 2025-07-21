import {
  redirect,
  type LoaderFunction,
  type NavigateFunction,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { UserTypeEnum } from "../enums/UserType.enum";
import type { TokenType } from "../types/Token.type";
import { SignInRoutesEnum } from "../routes/signIn.routes";
import { getItemStorage, removeItemStorage, setItemStorage } from "./storage";
import { AUTHORIZATION_KEY } from "../config/constants";

export const unsetAuthorizationToken = () => {
  removeItemStorage(AUTHORIZATION_KEY);
};

export const setAuthorizationToken = (token?: string) => {
  if (token) {
    setItemStorage(AUTHORIZATION_KEY, token);
  }
};

export const getAuthorizationToken = () => {
  return getItemStorage(AUTHORIZATION_KEY);
};

export const isValidToken = (token: string): boolean => {
  try {
    if (!token.startsWith("Bearer ")) {
      return false;
    }

    jwtDecode<TokenType>(token.split(" ")[1]);
    return true;
  } catch {
    return false;
  }
};

export const verifyLoggedIn = (userType?: UserTypeEnum): LoaderFunction => {
  return async () => {
    const token = getAuthorizationToken();
    if (!token) {
      return redirect(SignInRoutesEnum.SignIn);
    }

    if (!isValidToken(token)) {
      unsetAuthorizationToken();
      return redirect(SignInRoutesEnum.SignIn);
    }

    const decodedToken = jwtDecode<TokenType>(token);

    if (userType && decodedToken.userType !== userType) {
      unsetAuthorizationToken();
      return redirect(SignInRoutesEnum.SignIn);
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      unsetAuthorizationToken();
      return redirect(SignInRoutesEnum.SignIn);
    }

    return null;
  };
};

export const logout = (navigate: NavigateFunction) => {
  unsetAuthorizationToken();
  navigate(SignInRoutesEnum.SignIn);
};
