import { useEffect, useState } from "react";
import { useGlobalReducer } from "../../store/reducers/globalReducer/useGlobalReducer";
import styles from "./notification.module.css";
import type { NotificationType } from "../../types/Notification.type";

const SHOW_NOTIFICATION_DELAY = 10;
const TRANSITION_DURATION = 300;
const NOTIFICATION_TIMEOUT = 3000;

interface InternalNotificationType extends NotificationType {
  visible: boolean;
}

const Notification = () => {
  const { notification } = useGlobalReducer();

  const [notifications, setNotifications] = useState<
    InternalNotificationType[]
  >([]);

  useEffect(() => {
    if (notification) {
      const newNotification = {
        type: notification.type,
        message: notification.message,
        visible: false,
      };

      setNotifications((prev) => [...prev, newNotification]);

      setTimeout(() => {
        setNotifications((prev) =>
          prev.map((notification, index) =>
            index === prev.length - 1
              ? { ...notification, visible: true }
              : notification,
          ),
        );
      }, SHOW_NOTIFICATION_DELAY);

      setTimeout(() => {
        setNotifications((prev) =>
          prev.map((notification, index) =>
            index === 0 ? { ...notification, visible: false } : notification,
          ),
        );
      }, NOTIFICATION_TIMEOUT - TRANSITION_DURATION);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((_, index) => index !== 0));
      }, NOTIFICATION_TIMEOUT);
    }
  }, [notification]);

  const showNotification = (
    <div className={styles.container}>
      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`${styles.notification} ${
            notification.visible ? styles.notificationVisible : ""
          } ${styles[notification.type] || styles.default}`}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );

  return {
    showNotification,
  };
};

export default Notification;
