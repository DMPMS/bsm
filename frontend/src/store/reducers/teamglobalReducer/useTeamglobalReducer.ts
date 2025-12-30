import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import type { TeamglobalType } from "../../../types/Teamglobal.type";
import { setTeamglobalAction, setTeamglobalsAction } from ".";

export const useTeamglobalReducer = () => {
  const dispatch = useDispatch();
  const { teamglobal, teamglobals } = useAppSelector(
    (state) => state.teamglobalReducer
  );

  const setTeamglobal = (teamglobal?: TeamglobalType) => {
    dispatch(setTeamglobalAction(teamglobal));
  };

  const setTeamglobals = (teamglobals: TeamglobalType[]) => {
    dispatch(setTeamglobalsAction(teamglobals));
  };

  return {
    teamglobal,
    teamglobals,
    setTeamglobal,
    setTeamglobals,
  };
};
