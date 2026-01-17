import type { RouteObject } from "react-router-dom";
import CompetitionglobalsScreen from "../screens/competitionglobals.screen";
import UpsertCompetitionglobalScreen from "../screens/upsertCompetitionglobal.screen";

export enum CompetitionglobalRoutesEnum {
  Competitionglobals = "/competitionglobal",
  CreateCompetitionglobal = "/competitionglobal/create",
  UpdateCompetitionglobal = "/competitionglobal/:competitionglobalId",
}

export const competitionglobalRoutes: RouteObject[] = [
  {
    path: CompetitionglobalRoutesEnum.Competitionglobals,
    element: <CompetitionglobalsScreen />,
  },
  {
    path: CompetitionglobalRoutesEnum.CreateCompetitionglobal,
    element: <UpsertCompetitionglobalScreen />,
  },
  {
    path: CompetitionglobalRoutesEnum.UpdateCompetitionglobal,
    element: <UpsertCompetitionglobalScreen />,
  },
];
