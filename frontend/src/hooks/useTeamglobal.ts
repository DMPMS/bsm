import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { useTeamglobalReducer } from "../store/reducers/teamglobalReducer/useTeamglobalReducer";
import { useRequest } from "../utils/request";
import { useEffect, useState } from "react";
import type { TeamglobalType } from "../types/Teamglobal.type";
import { MethodEnum } from "../enums/Method.enum";
import { URL_TEAMGLOBAL, URL_TEAMGLOBAL_ID } from "../config/urls";
import type { AxiosError } from "axios";
import { OTHER_MESSAGES, TEAMGLOBAL_MESSAGES } from "../utils/messages";
import { NotificationEnum } from "../enums/Notification.enum";
import { logout } from "../utils/auth";
import { TeamglobalRoutesEnum } from "../routes/teamglobal.routes";

export const useTeamglobal = () => {
  const { setNotification } = useGlobalReducer();
  const { teamglobals, setTeamglobals } = useTeamglobalReducer();

  const { request, loadingRequest } = useRequest();
  const navigate = useNavigate();

  const [loadingTeamglobals, setLoadingTeamglobals] = useState<boolean>(true);
  const [teamglobalIdDelete, setTeamglobalIdDelete] = useState<
    string | undefined
  >(undefined);
  const [searchValue, setSearchValue] = useState<string>("");

  const teamglobalsFiltered = teamglobals.filter((teamglobal) =>
    teamglobal.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const fetchTeamglobals = async (timeout: number) => {
    await request<TeamglobalType[]>({
      method: MethodEnum.Get,
      url: URL_TEAMGLOBAL,
      timeout: timeout,
    })
      .then((data) => {
        setTeamglobals(data);
        setLoadingTeamglobals(false);
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
    if (!teamglobals || teamglobals.length === 0) {
      fetchTeamglobals(1000);
    } else {
      setLoadingTeamglobals(false);
    }
  }, []);

  const handleCreate = () => {
    navigate(TeamglobalRoutesEnum.CreateTeamglobal);
  };

  const handleUpdate = (teamglobalId: string) => {
    navigate(
      TeamglobalRoutesEnum.UpdateTeamglobal.replace(
        ":teamglobalId",
        teamglobalId
      )
    );
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleDelete = async () => {
    await request<void>({
      method: MethodEnum.Delete,
      url: URL_TEAMGLOBAL_ID.replace(":teamglobalId", `${teamglobalIdDelete}`),
      timeout: 1000,
    })
      .then(async () => {
        await fetchTeamglobals(0);

        setNotification({
          message: TEAMGLOBAL_MESSAGES.SUCCESS.DELETE,
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

    setTeamglobalIdDelete(undefined);
  };

  const handleCloseModalDelete = () => {
    setTeamglobalIdDelete(undefined);
  };

  const handleOpenModalDelete = (teamglobalId: string) => {
    setTeamglobalIdDelete(teamglobalId);
  };

  return {
    loadingTeamglobals,
    loadingRequest,
    teamglobals: teamglobalsFiltered,
    handleCreate,
    handleUpdate,
    handleSearch,
    handleDelete,
    openModalDelete: !!teamglobalIdDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    fetchTeamglobals,
  };
};
