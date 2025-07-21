import type { RouteObject } from "react-router-dom";
import SignInScreen from "../screens/signIn.screen";

export enum SignInRoutesEnum {
  SignIn = "/sign-in",
}

export const signInRoutes: RouteObject[] = [
  {
    path: SignInRoutesEnum.SignIn,
    element: <SignInScreen />,
  },
];
