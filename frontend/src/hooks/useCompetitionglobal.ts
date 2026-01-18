import { useNavigate } from "react-router-dom";
import { useCompetitionglobalReducer } from "../store/reducers/competitionglobalReducer/useCompetitionglobalReducer";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { useRequest } from "../utils/request";
import { useTeamglobal } from "./useTeamglobal";
import { useEffect, useState } from "react";
import type { CompetitionglobalType } from "../types/Competitionglobal.type";
import { MethodEnum } from "../enums/Method.enum";
import {
  URL_COMPETITIONGLOBAL,
  URL_COMPETITIONGLOBAL_ID,
} from "../config/urls";
import type { AxiosError } from "axios";
import { COMPETITIONGLOBAL_MESSAGES, OTHER_MESSAGES } from "../utils/messages";
import { NotificationEnum } from "../enums/Notification.enum";
import { logout } from "../utils/auth";
import { CompetitionglobalRoutesEnum } from "../routes/competitionglobal.routes";
import { useRule } from "./useRule";

export const useCompetitionglobal = () => {
  const { setNotification } = useGlobalReducer();
  const { competitionglobals, setCompetitionglobals } =
    useCompetitionglobalReducer();

  const { fetchRules } = useRule();
  const { fetchTeamglobals } = useTeamglobal();

  const { request, loadingRequest } = useRequest();
  const navigate = useNavigate();

  const [loadingCompetitionglobals, setLoadingCompetitionglobals] =
    useState<boolean>(true);
  const [loadingFetchs, setLoadingFetchs] = useState<boolean>(false);
  const [competitionglobalIdDelete, setCompetitionglobalIdDelete] = useState<
    string | undefined
  >(undefined);
  const [searchValue, setSearchValue] = useState<string>("");

  const competitionglobalsFiltered = competitionglobals.filter(
    (competitionglobal) =>
      competitionglobal.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const fetchCompetitionglobals = async (timeout?: number) => {
    await request<CompetitionglobalType[]>({
      method: MethodEnum.Get,
      url: URL_COMPETITIONGLOBAL,
      timeout: timeout,
    })
      .then((data) => {
        setCompetitionglobals(data);
        setLoadingCompetitionglobals(false);
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
    if (!competitionglobals || competitionglobals.length === 0) {
      fetchCompetitionglobals(1000);
    } else {
      setLoadingCompetitionglobals(false);
    }
  }, []);

  const handleCreate = () => {
    navigate(CompetitionglobalRoutesEnum.CreateCompetitionglobal);
  };

  const handleUpdate = (competitionglobalId: string) => {
    navigate(
      CompetitionglobalRoutesEnum.UpdateCompetitionglobal.replace(
        ":competitionglobalId",
        competitionglobalId,
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
      url: URL_COMPETITIONGLOBAL_ID.replace(
        ":competitionglobalId",
        `${competitionglobalIdDelete}`,
      ),
      timeout: 1000,
    })
      .then(async () => {
        await fetchCompetitionglobals();
        await fetchRules();
        await fetchTeamglobals();

        setNotification({
          message: COMPETITIONGLOBAL_MESSAGES.SUCCESS.DELETE,
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
    setCompetitionglobalIdDelete(undefined);
  };

  const handleCloseModalDelete = () => {
    setCompetitionglobalIdDelete(undefined);
  };

  const handleOpenModalDelete = (competitionglobalId: string) => {
    setCompetitionglobalIdDelete(competitionglobalId);
  };

  return {
    loadingCompetitionglobals,
    loadingRequest,
    loadingFetchs,
    competitionglobals: competitionglobalsFiltered,
    handleCreate,
    handleUpdate,
    handleSearch,
    handleDelete,
    openModalDelete: !!competitionglobalIdDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    fetchCompetitionglobals,
  };
};
