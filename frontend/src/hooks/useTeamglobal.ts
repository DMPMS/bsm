import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { useTeamglobalReducer } from "../store/reducers/teamglobalReducer/useTeamglobalReducer";
import { useRequest } from "../utils/request";
import { useEffect, useState } from "react";
import type { TeamglobalType } from "../types/Teamglobal.type";
import { MethodEnum } from "../enums/Method.enum";
import { URL_TEAMGLOBAL, URL_TEAMGLOBAL_ID } from "../config/urls";
import type { AxiosError } from "axios";
import { TEAMGLOBAL_MESSAGES } from "../utils/messages";
import { NotificationEnum } from "../enums/Notification.enum";
import { logout } from "../utils/auth";
import { TeamglobalRoutesEnum } from "../routes/teamglobal.routes";
import { usePlayerglobal } from "./usePlayerglobal";
import { useManagerglobal } from "./useManagerglobal";
import { defaultErrorNotification } from "../utils/defaultErrorNotification";

export const useTeamglobal = () => {
  const { setNotification } = useGlobalReducer();
  const { teamglobals, setTeamglobals } = useTeamglobalReducer();

  const { fetchPlayerglobals } = usePlayerglobal();
  const { fetchManagerglobals } = useManagerglobal();

  const { request, loadingRequest } = useRequest();
  const navigate = useNavigate();

  const [loadingTeamglobals, setLoadingTeamglobals] = useState<boolean>(true);
  const [loadingFetchs, setLoadingFetchs] = useState<boolean>(false);
  const [teamglobalIdDelete, setTeamglobalIdDelete] = useState<
    string | undefined
  >(undefined);
  const [searchValue, setSearchValue] = useState<string>("");

  const teamglobalsFiltered = teamglobals.filter((teamglobal) =>
    teamglobal.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const fetchTeamglobals = async (timeout?: number) => {
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
        defaultErrorNotification(error, setNotification);

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
        teamglobalId,
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
      url: URL_TEAMGLOBAL_ID.replace(":teamglobalId", `${teamglobalIdDelete}`),
      timeout: 1000,
    })
      .then(async () => {
        await fetchTeamglobals();
        await fetchPlayerglobals();
        await fetchManagerglobals();

        setNotification({
          message: TEAMGLOBAL_MESSAGES.SUCCESS.DELETE,
          type: NotificationEnum.Success,
        });
      })
      .catch((error: AxiosError) => {
        defaultErrorNotification(error, setNotification);
      });

    setLoadingFetchs(false);
    setTeamglobalIdDelete(undefined);
  };

  const handleCloseModalDelete = () => {
    setTeamglobalIdDelete(undefined);
  };

  const handleOpenModalDelete = (teamglobalId: string) => {
    setTeamglobalIdDelete(teamglobalId);
  };

  const handleLineupglobals = (teamglobalId: string) => {
    navigate(
      TeamglobalRoutesEnum.Lineupglobals.replace(":teamglobalId", teamglobalId),
    );
  };

  return {
    loadingTeamglobals,
    loadingRequest,
    loadingFetchs,
    teamglobals,
    teamglobalsFiltered,
    openModalDelete: !!teamglobalIdDelete,
    handleCreate,
    handleUpdate,
    handleSearch,
    handleDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleLineupglobals,
    fetchTeamglobals,
  };
};
