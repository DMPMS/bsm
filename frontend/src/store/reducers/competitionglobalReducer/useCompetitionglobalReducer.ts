import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { setCompetitionglobalsAction } from ".";
import type { CompetitionglobalType } from "../../../types/Competitionglobal.type";

export const useCompetitionglobalReducer = () => {
  const dispatch = useDispatch();
  const { competitionglobals } = useAppSelector(
    (state) => state.competitionglobalReducer
  );

  const setCompetitionglobals = (
    competitionglobals: CompetitionglobalType[]
  ) => {
    dispatch(setCompetitionglobalsAction(competitionglobals));
  };

  return {
    competitionglobals,
    setCompetitionglobals,
  };
};
