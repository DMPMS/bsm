import type { RouteObject } from "react-router-dom";
import ManagerglobalsScreen from "../screens/managerglobals.screen";
import UpsertManagerglobalScreen from "../screens/upsertManagerglobal.screen";

export enum ManagerglobalRoutesEnum {
  Managerglobals = "/managerglobal",
  CreateManagerglobal = "/managerglobal/create",
  UpdateManagerglobal = "/managerglobal/:managerglobalId",
}

export const managerglobalRoutes: RouteObject[] = [
  {
    path: ManagerglobalRoutesEnum.Managerglobals,
    element: <ManagerglobalsScreen />,
  },
  {
    path: ManagerglobalRoutesEnum.CreateManagerglobal,
    element: <UpsertManagerglobalScreen />,
  },
  {
    path: ManagerglobalRoutesEnum.UpdateManagerglobal,
    element: <UpsertManagerglobalScreen />,
  },
];
