import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { setCompetitionglobalAction, setCompetitionglobalsAction } from ".";
import type { CompetitionglobalType } from "../../../types/Competitionglobal.type";

export const useCompetitionglobalReducer = () => {
  const dispatch = useDispatch();
  const { competitionglobal, competitionglobals } = useAppSelector(
    (state) => state.competitionglobalReducer,
  );

  const setCompetitionglobal = (competitionglobal?: CompetitionglobalType) => {
    dispatch(setCompetitionglobalAction(competitionglobal));
  };

  const setCompetitionglobals = (
    competitionglobals: CompetitionglobalType[],
  ) => {
    dispatch(setCompetitionglobalsAction(competitionglobals));
  };

  return {
    competitionglobal,
    competitionglobals,
    setCompetitionglobal,
    setCompetitionglobals,
  };
};
