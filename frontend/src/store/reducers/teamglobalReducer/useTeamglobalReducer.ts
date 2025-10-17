import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import type { TeamglobalType } from "../../../types/Teamglobal.type";
import { setTeamglobalsAction } from ".";

export const useTeamglobalReducer = () => {
  const dispatch = useDispatch();
  const { teamglobals } = useAppSelector((state) => state.teamglobalReducer);

  const setTeamglobals = (teamglobals: TeamglobalType[]) => {
    dispatch(setTeamglobalsAction(teamglobals));
  };

  return {
    teamglobals,
    setTeamglobals,
  };
};
