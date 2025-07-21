import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { setNotificationAction, setUserAction } from ".";
import type { UserType } from "../../../types/User.type";
import type { NotificationType } from "../../../types/Notification.type";

export const useGlobalReducer = () => {
  const dispatch = useDispatch();
  const { user, notification } = useAppSelector((state) => state.globalReducer);

  const setUser = (user: UserType) => {
    dispatch(setUserAction(user));
  };

  const setNotification = (notification: NotificationType) => {
    dispatch(setNotificationAction(notification));
  };

  return {
    user,
    notification,
    setUser,
    setNotification,
  };
};
