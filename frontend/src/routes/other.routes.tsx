import type { RouteObject } from "react-router-dom";
import HomeAdminScreen from "../screens/homeAdmin.screen";

export enum OtherRoutesEnum {
  HomeAdmin = "/home",
}

export const otherRoutes: RouteObject[] = [
  {
    path: OtherRoutesEnum.HomeAdmin,
    element: <HomeAdminScreen />,
  },
];
