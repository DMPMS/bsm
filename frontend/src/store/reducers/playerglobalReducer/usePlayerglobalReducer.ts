import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import type { PlayerglobalType } from "../../../types/Playerglobal.type";
import { setPlayerglobalsAction } from ".";

export const usePlayerglobalReducer = () => {
  const dispatch = useDispatch();
  const { playerglobals } = useAppSelector(
    (state) => state.playerglobalReducer
  );

  const setPlayerglobals = (playerglobals: PlayerglobalType[]) => {
    dispatch(setPlayerglobalsAction(playerglobals));
  };

  return {
    playerglobals,
    setPlayerglobals,
  };
};
