import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { setUsersAction } from ".";
import type { UserType } from "../../../types/User.type";

export const useUserReducer = () => {
  const dispatch = useDispatch();
  const { users } = useAppSelector((state) => state.userReducer);

  const setUsers = (users: UserType[]) => {
    dispatch(setUsersAction(users));
  };

  return {
    users,
    setUsers,
  };
};
