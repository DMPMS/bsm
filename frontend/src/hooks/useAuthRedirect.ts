import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { useEffect } from "react";
import {
  getAuthorizationToken,
  isValidToken,
  unsetAuthorizationToken,
} from "../utils/auth";
import { SignInRoutesEnum } from "../routes/signIn.routes";
import { jwtDecode } from "jwt-decode";
import type { TokenType } from "../types/Token.type";
import { MILLISECONDS_TO_SECONDS } from "../config/constants";
import { UserTypeEnum } from "../enums/UserType.enum";
import { UserRoutesEnum } from "../routes/user.routes";
import { SIGN_IN_MESSAGES } from "../utils/messages";
import { NotificationEnum } from "../enums/Notification.enum";

export const useAuthRedirect = () => {
  const { user, setNotification } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthorizationToken();
    if (!token) {
      navigate(SignInRoutesEnum.SignIn);
    } else if (!isValidToken(token)) {
      unsetAuthorizationToken();
      navigate(SignInRoutesEnum.SignIn);
    } else {
      const decodedToken = jwtDecode<TokenType>(token.split(" ")[1]);
      const currentTime = Math.floor(Date.now() / MILLISECONDS_TO_SECONDS);

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        unsetAuthorizationToken();
        navigate(SignInRoutesEnum.SignIn);
        // } else if (decodedToken.userType === UserTypeEnum.User) {
        //   navigate(SaveRoutesEnum.Saves);
      } else if (decodedToken.userType === UserTypeEnum.Admin) {
        navigate(UserRoutesEnum.Users);
      } else {
        unsetAuthorizationToken();
        setNotification({
          message: SIGN_IN_MESSAGES.ERROR.TOKEN_USER_TYPE_ROOT,
          type: NotificationEnum.Error,
        });
        navigate(SignInRoutesEnum.SignIn);
      }
    }
  }, [user]);
};
