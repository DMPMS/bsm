import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { usePositionReducer } from "../store/reducers/positionReducer/useTeamglobalReducer";
import { useRequest } from "../utils/request";
import { useEffect, useState } from "react";
import { MethodEnum } from "../enums/Method.enum";
import { URL_POSITION } from "../config/urls";
import type { PositionType } from "../types/Position.type";
import type { AxiosError } from "axios";
import { OTHER_MESSAGES } from "../utils/messages";
import { NotificationEnum } from "../enums/Notification.enum";
import { logout } from "../utils/auth";

export const usePosition = () => {
  const { setNotification } = useGlobalReducer();
  const { positions, setPositions } = usePositionReducer();

  const { request } = useRequest();
  const navigate = useNavigate();

  const [loadingPositions, setLoadingPositions] = useState<boolean>(true);

  const fetchPositions = async (timeout?: number) => {
    await request<PositionType[]>({
      method: MethodEnum.Get,
      url: URL_POSITION,
      timeout: timeout,
    })
      .then((data) => {
        setPositions(data);
        setLoadingPositions(false);
      })
      .catch((error: AxiosError) => {
        const responseErrorMessage =
          (error.response?.data as string) || OTHER_MESSAGES.DEFAULT_ERROR;

        setNotification({
          message: responseErrorMessage,
          type: NotificationEnum.Error,
        });

        logout(navigate);
      });
  };

  useEffect(() => {
    if (!positions || positions.length === 0) {
      fetchPositions(1000);
    } else {
      setLoadingPositions(false);
    }
  }, []);

  return {
    loadingPositions,
    positions,
  };
};
