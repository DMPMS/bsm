import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { useManagerglobalReducer } from "../store/reducers/managerglobalReducer/useManagerglobalReducer";
import { useRequest } from "../utils/request";
import { useEffect, useState } from "react";
import type { ManagerglobalType } from "../types/Managerglobal.type";
import { MethodEnum } from "../enums/Method.enum";
import { URL_MANAGERGLOBAL, URL_MANAGERGLOBAL_ID } from "../config/urls";
import type { AxiosError } from "axios";
import { MANAGERGLOBAL_MESSAGES, OTHER_MESSAGES } from "../utils/messages";
import { NotificationEnum } from "../enums/Notification.enum";
import { logout } from "../utils/auth";
import { ManagerglobalRoutesEnum } from "../routes/managerglobal.routes";

export const useManagerglobal = () => {
  const { setNotification } = useGlobalReducer();
  const { managerglobals, setManagerglobals } = useManagerglobalReducer();

  const { request, loadingRequest } = useRequest();
  const navigate = useNavigate();

  const [loadingManagerglobals, setLoadingManagerglobals] =
    useState<boolean>(true);
  const [loadingFetchs, setLoadingFetchs] = useState<boolean>(false);
  const [managerglobalIdDelete, setManagerglobalIdDelete] = useState<
    string | undefined
  >(undefined);
  const [searchValue, setSearchValue] = useState<string>("");

  const managerglobalsFiltered = managerglobals.filter((managerglobal) =>
    managerglobal.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const fetchManagerglobals = async (timeout?: number) => {
    await request<ManagerglobalType[]>({
      method: MethodEnum.Get,
      url: URL_MANAGERGLOBAL,
      timeout: timeout,
    })
      .then((data) => {
        setManagerglobals(data);
        setLoadingManagerglobals(false);
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
    if (!managerglobals || managerglobals.length === 0) {
      fetchManagerglobals(1000);
    } else {
      setLoadingManagerglobals(false);
    }
  }, []);

  const handleCreate = () => {
    navigate(ManagerglobalRoutesEnum.CreateManagerglobal);
  };

  const handleUpdate = (managerglobalId: string) => {
    navigate(
      ManagerglobalRoutesEnum.UpdateManagerglobal.replace(
        ":managerglobalId",
        managerglobalId,
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
      url: URL_MANAGERGLOBAL_ID.replace(
        ":managerglobalId",
        `${managerglobalIdDelete}`,
      ),
      timeout: 1000,
    })
      .then(async () => {
        await fetchManagerglobals();

        setNotification({
          message: MANAGERGLOBAL_MESSAGES.SUCCESS.DELETE,
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
    setManagerglobalIdDelete(undefined);
  };

  const handleCloseModalDelete = () => {
    setManagerglobalIdDelete(undefined);
  };

  const handleOpenModalDelete = (managerglobalId: string) => {
    setManagerglobalIdDelete(managerglobalId);
  };

  return {
    loadingManagerglobals,
    loadingRequest,
    loadingFetchs,
    managerglobals: managerglobalsFiltered,
    handleCreate,
    handleUpdate,
    handleSearch,
    handleDelete,
    openModalDelete: !!managerglobalIdDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    fetchManagerglobals,
  };
};
