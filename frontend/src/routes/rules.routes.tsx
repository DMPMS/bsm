import type { RouteObject } from "react-router-dom";
import RulesScreen from "../screens/rules.screen";

export enum RulesRoutesEnum {
  Rules = "/rules",
}

export const rulesRoutes: RouteObject[] = [
  {
    path: RulesRoutesEnum.Rules,
    element: <RulesScreen />,
  },
];
