import type { AxiosError } from "axios";
import { NotificationEnum } from "../enums/Notification.enum";
import { OTHER_MESSAGES } from "./messages";
import type { NotificationType } from "../types/Notification.type";

export const defaultErrorNotification = (
  error: AxiosError,
  setNotification: (notification: NotificationType) => void,
) => {
  const responseErrorMessage =
    (error.response?.data as string) || OTHER_MESSAGES.DEFAULT_ERROR;

  setNotification({
    message: responseErrorMessage,
    type: NotificationEnum.Error,
  });
};
