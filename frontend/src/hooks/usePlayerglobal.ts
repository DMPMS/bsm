import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { usePlayerglobalReducer } from "../store/reducers/playerglobalReducer/usePlayerglobalReducer";
import { useRequest } from "../utils/request";
import { useEffect, useState } from "react";
import { MethodEnum } from "../enums/Method.enum";
import { URL_PLAYERGLOBAL, URL_PLAYERGLOBAL_ID } from "../config/urls";
import type { AxiosError } from "axios";
import { OTHER_MESSAGES, PLAYERGLOBAL_MESSAGES } from "../utils/messages";
import { NotificationEnum } from "../enums/Notification.enum";
import { logout } from "../utils/auth";
import { PlayerglobalRoutesEnum } from "../routes/playerglobal.routes";
import type { PlayerglobalType } from "../types/Playerglobal.type";

export const usePlayerglobal = () => {
  const { setNotification } = useGlobalReducer();
  const { playerglobals, setPlayerglobals } = usePlayerglobalReducer();

  const { request, loadingRequest } = useRequest();
  const navigate = useNavigate();

  const [loadingPlayerglobals, setLoadingPlayerglobals] =
    useState<boolean>(true);
  const [loadingFetchs, setLoadingFetchs] = useState<boolean>(false);
  const [playerglobalIdDelete, setPlayerglobalIdDelete] = useState<
    string | undefined
  >(undefined);
  const [searchValue, setSearchValue] = useState<string>("");

  const playerglobalsFiltered = playerglobals.filter((playerglobal) =>
    playerglobal.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const fetchPlayerglobals = async (timeout?: number) => {
    await request<PlayerglobalType[]>({
      method: MethodEnum.Get,
      url: URL_PLAYERGLOBAL,
      timeout: timeout,
    })
      .then((data) => {
        setPlayerglobals(data);
        setLoadingPlayerglobals(false);
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
    if (!playerglobals || playerglobals.length === 0) {
      fetchPlayerglobals(1000);
    } else {
      setLoadingPlayerglobals(false);
    }
  }, []);

  const handleCreate = () => {
    navigate(PlayerglobalRoutesEnum.CreatePlayerglobal);
  };

  const handleUpdate = (playerglobalId: string) => {
    navigate(
      PlayerglobalRoutesEnum.UpdatePlayerglobal.replace(
        ":playerglobalId",
        playerglobalId,
      ),
    );
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleDelete = async () => {
    setLoadingFetchs(true);

    await request<void>({
      method: MethodEnum.Delete,
      url: URL_PLAYERGLOBAL_ID.replace(
        ":playerglobalId",
        `${playerglobalIdDelete}`,
      ),
      timeout: 1000,
    })
      .then(async () => {
        await fetchPlayerglobals();

        setNotification({
          message: PLAYERGLOBAL_MESSAGES.SUCCESS.DELETE,
          type: NotificationEnum.Success,
        });
      })
      .catch((error: AxiosError) => {
        const responseErrorMessage =
          (error.response?.data as string) || OTHER_MESSAGES.DEFAULT_ERROR;

        setNotification({
          message: responseErrorMessage,
          type: NotificationEnum.Error,
        });
      });

    setLoadingFetchs(false);
    setPlayerglobalIdDelete(undefined);
  };

  const handleCloseModalDelete = () => {
    setPlayerglobalIdDelete(undefined);
  };

  const handleOpenModalDelete = (playerglobalId: string) => {
    setPlayerglobalIdDelete(playerglobalId);
  };

  return {
    loadingPlayerglobals,
    loadingRequest,
    loadingFetchs,
    playerglobals: playerglobalsFiltered,
    handleCreate,
    handleUpdate,
    handleSearch,
    handleDelete,
    openModalDelete: !!playerglobalIdDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    fetchPlayerglobals,
  };
};
