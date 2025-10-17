import type { RouteObject } from "react-router-dom";
import TeamglobalsScreen from "../screens/teamglobals.screen";
import UpsertTeamglobalScreen from "../screens/upsertTeamglobal.screen";

export enum TeamglobalRoutesEnum {
  Teamglobals = "/teamglobal",
  CreateTeamglobal = "/teamglobal/create",
  UpdateTeamglobal = "/teamglobal/:teamglobalId",
}

export const teamglobalRoutes: RouteObject[] = [
  {
    path: TeamglobalRoutesEnum.Teamglobals,
    element: <TeamglobalsScreen />,
  },
  {
    path: TeamglobalRoutesEnum.CreateTeamglobal,
    element: <UpsertTeamglobalScreen />,
  },
  {
    path: TeamglobalRoutesEnum.UpdateTeamglobal,
    element: <UpsertTeamglobalScreen />,
  },
];
