import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { useRequest } from "../utils/request";
import { useEffect, useState } from "react";
import { INITIAL_UPDATE_ACTIVE_LINEUPGLOBAL_DTO } from "../utils/initialDtos";
import { useLineupglobalReducer } from "../store/reducers/lineupglobalReducer/useLineupglobalReducer";
import type { LineupglobalType } from "../types/Lineupglobal.type";
import { URL_LINEUPGLOBAL, URL_TEAMGLOBAL_ID } from "../config/urls";
import type { AxiosError } from "axios";
import { defaultErrorNotification } from "../utils/defaultErrorNotification";
import { TeamglobalRoutesEnum } from "../routes/teamglobal.routes";
import { MethodEnum } from "../enums/Method.enum";
import { LineupPresetEnum } from "../enums/LineupPreset.enum";
import { useTeamglobalReducer } from "../store/reducers/teamglobalReducer/useTeamglobalReducer";
import type { TeamglobalType } from "../types/Teamglobal.type";
import type { UpdateActiveLineupglobalDto } from "../dtos/updateActiveLineupglobal.dto";
import { LINEUPGLOBAL_MESSAGES } from "../utils/messages";
import { NotificationEnum } from "../enums/Notification.enum";

export const useLineupglobals = (teamglobalId: string) => {
  const { setNotification } = useGlobalReducer();

  const { lineupglobals, setLineupglobals } = useLineupglobalReducer();
  const { teamglobal, setTeamglobal } = useTeamglobalReducer();

  const { request, loadingRequest } = useRequest();
  const navigate = useNavigate();

  const [loadingLineupglobals, setLoadingLineupglobals] =
    useState<boolean>(true);
  const [loadingTeamglobal, setLoadingTeamglobal] = useState<boolean>(true);
  const [loadingRequestPreset, setLoadingRequestPreset] = useState<
    LineupPresetEnum | undefined
  >(undefined);
  const [updateActiveLineupglobal, setUpdateActiveLineupglobal] =
    useState<UpdateActiveLineupglobalDto>(
      INITIAL_UPDATE_ACTIVE_LINEUPGLOBAL_DTO,
    );

  const findAndSetTeamglobalReducer = async (teamglobalId: string) => {
    await request<TeamglobalType>({
      method: MethodEnum.Get,
      url: URL_TEAMGLOBAL_ID.replace(":teamglobalId", teamglobalId),
      timeout: 1000,
    })
      .then(async (data) => {
        setTeamglobal(data);
        setLoadingTeamglobal(false);

        await findAndSetLineupglobalsReducer(teamglobalId);
      })
      .catch((error: AxiosError) => {
        defaultErrorNotification(error, setNotification);
        navigate(TeamglobalRoutesEnum.Teamglobals);
      });
  };

  const findAndSetLineupglobalsReducer = async (teamglobalId: string) => {
    await request<LineupglobalType[]>({
      method: MethodEnum.Get,
      url: URL_LINEUPGLOBAL.replace(":teamglobalId", teamglobalId),
      timeout: 1000,
    })
      .then(async (data) => {
        setLineupglobals(data);
        setLoadingLineupglobals(false);
      })
      .catch((error: AxiosError) => {
        defaultErrorNotification(error, setNotification);
        navigate(TeamglobalRoutesEnum.Teamglobals);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await findAndSetTeamglobalReducer(teamglobalId);
    };

    fetchData();
  }, [teamglobalId]);

  useEffect(() => {
    if (lineupglobals && lineupglobals.length > 0 && teamglobal) {
      const activePreset = lineupglobals.find(
        (lineupglobal) =>
          lineupglobal.preset === teamglobal.activeLineupglobalPreset,
      )!.preset as LineupPresetEnum;

      setUpdateActiveLineupglobal({
        lineupglobalPreset: activePreset,
      });
    }
  }, [lineupglobals]);

  const handleUpdateActiveLineupglobal = async (preset: LineupPresetEnum) => {
    const dto = {
      lineupglobalPreset: preset,
    };

    await request<TeamglobalType>({
      method: MethodEnum.Patch,
      url: URL_LINEUPGLOBAL.replace(":teamglobalId", teamglobalId),
      body: dto,
      timeout: 1000,
    })
      .then(async () => {
        await findAndSetTeamglobalReducer(teamglobalId);

        setLoadingRequestPreset(undefined);

        setNotification({
          message: LINEUPGLOBAL_MESSAGES.SUCCESS.UPDATE_ACTIVE_LINEUPGLOBAL,
          type: NotificationEnum.Success,
        });
      })
      .catch((error: AxiosError) => {
        defaultErrorNotification(error, setNotification);
      });
  };

  const handleClickUpdate = (preset: LineupPresetEnum) => {
    setLoadingRequestPreset(preset);
    handleUpdateActiveLineupglobal(preset);
  };

  const handleClickTeamglobals = () => {
    navigate(TeamglobalRoutesEnum.Teamglobals);
  };

  const handleClickUpdateTeamglobal = () => {
    navigate(
      TeamglobalRoutesEnum.UpdateTeamglobal.replace(
        ":teamglobalId",
        teamglobalId,
      ),
    );
  };

  return {
    updateActiveLineupglobal,
    loadingLineupglobals,
    loadingRequest,
    lineupglobals,
    loadingTeamglobal,
    teamglobal,
    loadingRequestPreset,
    handleClickUpdate,
    handleClickTeamglobals,
    handleClickUpdateTeamglobal,
  };
};
