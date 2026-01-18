import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import type { PlayerglobalType } from "../../../types/Playerglobal.type";
import { setPlayerglobalAction, setPlayerglobalsAction } from ".";

export const usePlayerglobalReducer = () => {
  const dispatch = useDispatch();
  const { playerglobal, playerglobals } = useAppSelector(
    (state) => state.playerglobalReducer,
  );

  const setPlayerglobal = (playerglobal?: PlayerglobalType) => {
    dispatch(setPlayerglobalAction(playerglobal));
  };

  const setPlayerglobals = (playerglobals: PlayerglobalType[]) => {
    dispatch(setPlayerglobalsAction(playerglobals));
  };

  return {
    playerglobal,
    playerglobals,
    setPlayerglobal,
    setPlayerglobals,
  };
};
