import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { setManagerglobalsAction } from ".";
import type { ManagerglobalType } from "../../../types/Managerglobal.type";

export const useManagerglobalReducer = () => {
  const dispatch = useDispatch();
  const { managerglobals } = useAppSelector(
    (state) => state.managerglobalReducer
  );

  const setManagerglobals = (Managerglobals: ManagerglobalType[]) => {
    dispatch(setManagerglobalsAction(Managerglobals));
  };

  return {
    managerglobals,
    setManagerglobals,
  };
};
