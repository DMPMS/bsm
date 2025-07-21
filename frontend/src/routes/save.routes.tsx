import type { RouteObject } from "react-router-dom";
import SavesScreen from "../screens/saves.screen";

export enum SaveRoutesEnum {
  Saves = "/save",
}

export const saveRoutes: RouteObject[] = [
  {
    path: SaveRoutesEnum.Saves,
    element: <SavesScreen />,
  },
];
