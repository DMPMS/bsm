import type { RouteObject } from "react-router-dom";
import SignUpScreen from "../screens/signUp.screen";

export enum SignUpRoutesEnum {
  SignUp = "/sign-up",
}

export const signUpRoutes: RouteObject[] = [
  {
    path: SignUpRoutesEnum.SignUp,
    element: <SignUpScreen />,
  },
];
