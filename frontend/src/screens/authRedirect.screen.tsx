import { useNavigate } from "react-router-dom";
import styles from "../styles/authRedirectScreen.module.css";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  getAuthorizationToken,
  isValidToken,
  unsetAuthorizationToken,
} from "../utils/auth";
import { SignInRoutesEnum } from "../routes/signIn.routes";
import type { TokenType } from "../types/Token.type";
import { UserTypeEnum } from "../enums/UserType.enum";
import { NotificationEnum } from "../enums/Notification.enum";
import { UserRoutesEnum } from "../routes/user.routes";
import { SIGN_IN_MESSAGES } from "../utils/messages";
import Spinner from "../components/spinner/spinner";

const AuthRedirectScreen = () => {
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
      const currentTime = Math.floor(Date.now() / 1000);

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

  return (
    <div className={styles.container}>
      <Spinner size={50} />
    </div>
  );
};

export default AuthRedirectScreen;
