import type { RouteObject } from "react-router-dom";
import PlayerglobalsScreen from "../screens/playerglobals.screen";
import UpsertPlayerglobalScreen from "../screens/upsertPlayerglobal.screen";

export enum PlayerglobalRoutesEnum {
  Playerglobals = "/playerglobal",
  CreatePlayerglobal = "/playerglobal/create",
  UpdatePlayerglobal = "/playerglobal/:playerglobalId",
}

export const playerglobalRoutes: RouteObject[] = [
  {
    path: PlayerglobalRoutesEnum.Playerglobals,
    element: <PlayerglobalsScreen />,
  },
  {
    path: PlayerglobalRoutesEnum.CreatePlayerglobal,
    element: <UpsertPlayerglobalScreen />,
  },
  {
    path: PlayerglobalRoutesEnum.UpdatePlayerglobal,
    element: <UpsertPlayerglobalScreen />,
  },
];
