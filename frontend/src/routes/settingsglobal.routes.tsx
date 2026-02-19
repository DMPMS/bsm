import type { RouteObject } from "react-router-dom";
import SettingsglobalScreen from "../screens/settingsglobal.screen";

export enum SettingsglobalRoutesEnum {
  Settingsglobal = "/settings",
}

export const settingsglobalRoutes: RouteObject[] = [
  {
    path: SettingsglobalRoutesEnum.Settingsglobal,
    element: <SettingsglobalScreen />,
  },
];
