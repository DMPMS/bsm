import { NotificationEnum } from "../enums/Notification.enum";

export interface NotificationType {
  message: string;
  type: NotificationEnum;
}
