import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import type { PositionType } from "../../../types/Position.type";
import { setPositionsAction } from ".";

export const usePositionReducer = () => {
  const dispatch = useDispatch();
  const { positions } = useAppSelector((state) => state.positionReducer);

  const setPositions = (positions: PositionType[]) => {
    dispatch(setPositionsAction(positions));
  };

  return {
    positions,
    setPositions,
  };
};
