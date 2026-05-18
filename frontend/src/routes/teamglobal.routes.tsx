import type { RouteObject } from "react-router-dom";
import TeamglobalsScreen from "../screens/teamglobals.screen";
import UpsertTeamglobalScreen from "../screens/upsertTeamglobal.screen";
import LineupglobalsScreen from "../screens/lineupglobals.screen";

export enum TeamglobalRoutesEnum {
  Teamglobals = "/teamglobal",
  CreateTeamglobal = "/teamglobal/create",
  UpdateTeamglobal = "/teamglobal/:teamglobalId",
  Lineupglobals = "/teamglobal/:teamglobalId/lineupglobal",
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
  {
    path: TeamglobalRoutesEnum.Lineupglobals,
    element: <LineupglobalsScreen />,
  },
];
