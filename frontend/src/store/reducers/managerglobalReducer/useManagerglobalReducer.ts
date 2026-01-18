import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { setManagerglobalAction, setManagerglobalsAction } from ".";
import type { ManagerglobalType } from "../../../types/Managerglobal.type";

export const useManagerglobalReducer = () => {
  const dispatch = useDispatch();
  const { managerglobal, managerglobals } = useAppSelector(
    (state) => state.managerglobalReducer,
  );

  const setManagerglobal = (managerglobal?: ManagerglobalType) => {
    dispatch(setManagerglobalAction(managerglobal));
  };

  const setManagerglobals = (managerglobals: ManagerglobalType[]) => {
    dispatch(setManagerglobalsAction(managerglobals));
  };

  return {
    managerglobal,
    managerglobals,
    setManagerglobal,
    setManagerglobals,
  };
};
