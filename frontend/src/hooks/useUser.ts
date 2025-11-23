import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { useUserReducer } from "../store/reducers/userReducer/useUserReducer";
import { useRequest } from "../utils/request";
import { useEffect, useState } from "react";
import { URL_USER, URL_USER_ID } from "../config/urls";
import type { UserType } from "../types/User.type";
import { MethodEnum } from "../enums/Method.enum";
import type { AxiosError } from "axios";
import { OTHER_MESSAGES, USER_MESSAGES } from "../utils/messages";
import { NotificationEnum } from "../enums/Notification.enum";
import { logout } from "../utils/auth";

export const useUser = () => {
  const { setNotification } = useGlobalReducer();
  const { users, setUsers } = useUserReducer();

  const { request, loadingRequest } = useRequest();
  const navigate = useNavigate();

  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [loadingFetchs, setLoadingFetchs] = useState<boolean>(false);
  const [userIdDelete, setUserIdDelete] = useState<string | undefined>(
    undefined
  );
  const [searchValue, setSearchValue] = useState<string>("");

  const usersFiltered = users.filter((user) =>
    user.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const fetchUsers = async (timeout: number) => {
    await request<UserType[]>({
      method: MethodEnum.Get,
      url: URL_USER,
      timeout: timeout,
    })
      .then((data) => {
        setUsers(data);
        setLoadingUsers(false);
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
    if (!users || users.length === 0) {
      fetchUsers(1000);
    } else {
      setLoadingUsers(false);
    }
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleDelete = async () => {
    setLoadingFetchs(true);

    await request<void>({
      method: MethodEnum.Delete,
      url: URL_USER_ID.replace(":userId", `${userIdDelete}`),
      timeout: 1000,
    })
      .then(async () => {
        await fetchUsers(0);

        setNotification({
          message: USER_MESSAGES.SUCCESS.DELETE,
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
    setUserIdDelete(undefined);
  };

  const handleCloseModalDelete = () => {
    setUserIdDelete(undefined);
  };

  const handleOpenModalDelete = (userId: string) => {
    setUserIdDelete(userId);
  };

  return {
    loadingUsers,
    loadingRequest,
    loadingFetchs,
    users: usersFiltered,
    handleSearch,
    handleDelete,
    openModalDelete: !!userIdDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    fetchUsers,
  };
};
