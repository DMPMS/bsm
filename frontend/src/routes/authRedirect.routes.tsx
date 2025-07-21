import { type RouteObject } from "react-router-dom";
import AuthRedirectScreen from "../screens/authRedirect.screen";

export enum AuthRedirectRoutesEnum {
  AuthRedirect = "/",
}

export const authRedirectRoutes: RouteObject[] = [
  {
    path: AuthRedirectRoutesEnum.AuthRedirect,
    element: <AuthRedirectScreen />,
  },
];
