import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import type { LineupglobalType } from "../../../types/Lineupglobal.type";
import { setLineupglobalAction, setLineupglobalsAction } from ".";

export const useLineupglobalReducer = () => {
  const dispatch = useDispatch();
  const { lineupglobal, lineupglobals } = useAppSelector(
    (state) => state.lineupglobalReducer,
  );

  const setLineupglobal = (lineupglobal?: LineupglobalType) => {
    dispatch(setLineupglobalAction(lineupglobal));
  };

  const setLineupglobals = (lineupglobals: LineupglobalType[]) => {
    dispatch(setLineupglobalsAction(lineupglobals));
  };

  return {
    lineupglobal,
    lineupglobals,
    setLineupglobal,
    setLineupglobals,
  };
};
