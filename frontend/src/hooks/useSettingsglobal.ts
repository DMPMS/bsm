import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { useRequest } from "../utils/request";
import { useEffect, useState } from "react";
import type { UpdateSettingsglobalDto } from "../dtos/updateSettingsglobal.dto";
import { INITIAL_UPDATE_SETTINGSGLOBAL_DTO } from "../utils/initialDtos";
import type { SettingsglobalType } from "../types/Settingsglobal.type";
import { MethodEnum } from "../enums/Method.enum";
import { URL_SETTINGSGLOBAL } from "../config/urls";
import type { AxiosError } from "axios";
import { SETTINGSGLOBAL_MESSAGES } from "../utils/messages";
import { NotificationEnum } from "../enums/Notification.enum";
import { logout } from "../utils/auth";
import type { SeasonOffsetEnum } from "../enums/SeasonOffset.enum";
import { OtherRoutesEnum } from "../routes/other.routes";
import { defaultErrorNotification } from "../utils/defaultErrorNotification";

export const useSettingsglobal = () => {
  const { settingsglobal, setSettingsglobal, setNotification } =
    useGlobalReducer();

  const { request, loadingRequest } = useRequest();
  const navigate = useNavigate();

  const [loadingSettingsglobal, setLoadingSettingsglobal] =
    useState<boolean>(true);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [updateSettingsglobal, setUpdateSettingsglobal] =
    useState<UpdateSettingsglobalDto>(INITIAL_UPDATE_SETTINGSGLOBAL_DTO);

  const fetchSettingsglobal = async (timeout?: number) => {
    await request<SettingsglobalType>({
      method: MethodEnum.Get,
      url: URL_SETTINGSGLOBAL,
      timeout: timeout,
    })
      .then((data) => {
        setSettingsglobal(data);
        setLoadingSettingsglobal(false);
      })
      .catch((error: AxiosError) => {
        defaultErrorNotification(error, setNotification);

        logout(navigate);
      });
  };

  useEffect(() => {
    if (!settingsglobal) {
      fetchSettingsglobal(1000);
    } else {
      setLoadingSettingsglobal(false);
    }
  }, []);

  useEffect(() => {
    if (settingsglobal) {
      setUpdateSettingsglobal({
        seasonOffset: settingsglobal.seasonOffset,
      });
    } else {
      setUpdateSettingsglobal(INITIAL_UPDATE_SETTINGSGLOBAL_DTO);
    }
  }, [settingsglobal]);

  useEffect(() => {
    if (updateSettingsglobal.seasonOffset !== undefined) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [updateSettingsglobal]);

  const handleChangeSeasonOffsetButton = (value: SeasonOffsetEnum) => {
    setUpdateSettingsglobal({
      ...updateSettingsglobal,
      seasonOffset: value,
    });
  };

  const handleUpdateSettingsglobal = async (e: React.FormEvent) => {
    e.preventDefault();

    await request<SettingsglobalType>({
      method: MethodEnum.Put,
      url: URL_SETTINGSGLOBAL,
      body: updateSettingsglobal,
      timeout: 1000,
    })
      .then(async () => {
        setSettingsglobal({
          ...settingsglobal,
          ...updateSettingsglobal,
          id: settingsglobal!.id,
        });

        setNotification({
          message: SETTINGSGLOBAL_MESSAGES.SUCCESS.UPDATE,
          type: NotificationEnum.Success,
        });
      })
      .catch((error: AxiosError) => {
        defaultErrorNotification(error, setNotification);
      });
  };

  const handleReset = () => {
    setUpdateSettingsglobal(INITIAL_UPDATE_SETTINGSGLOBAL_DTO);
  };

  const handleCancel = () => {
    navigate(OtherRoutesEnum.HomeAdmin);
  };

  return {
    settingsglobal,
    updateSettingsglobal,
    loadingSettingsglobal,
    loadingRequest,
    disabledButton,
    handleChangeSeasonOffsetButton,
    handleUpdateSettingsglobal,
    handleReset,
    handleCancel,
  };
};
