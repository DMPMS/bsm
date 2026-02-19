import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import {
  setSettingsglobalAction,
  setNotificationAction,
  setUserAction,
} from ".";
import type { UserType } from "../../../types/User.type";
import type { NotificationType } from "../../../types/Notification.type";
import type { SettingsglobalType } from "../../../types/Settingsglobal.type";

export const useGlobalReducer = () => {
  const dispatch = useDispatch();
  const { user, settingsglobal, notification } = useAppSelector(
    (state) => state.globalReducer,
  );

  const setUser = (user: UserType) => {
    dispatch(setUserAction(user));
  };

  const setSettingsglobal = (settingsglobal: SettingsglobalType) => {
    dispatch(setSettingsglobalAction(settingsglobal));
  };

  const setNotification = (notification: NotificationType) => {
    dispatch(setNotificationAction(notification));
  };

  return {
    user,
    settingsglobal,
    notification,
    setUser,
    setSettingsglobal,
    setNotification,
  };
};
