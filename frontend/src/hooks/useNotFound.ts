import { useNavigate } from "react-router-dom";
import { SignInRoutesEnum } from "../routes/signIn.routes";

export const useNotFound = () => {
  const navigate = useNavigate();

  const handleOnClickButton = () => {
    navigate(SignInRoutesEnum.SignIn);
  };

  return {
    handleOnClickButton,
  };
};
