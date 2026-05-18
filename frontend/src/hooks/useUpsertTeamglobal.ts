import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { useTeamglobalReducer } from "../store/reducers/teamglobalReducer/useTeamglobalReducer";
import { useRequest } from "../utils/request";
import { useCountry } from "./useCountry";
import { usePlayerglobal } from "./usePlayerglobal";
import { useTeamglobal } from "./useTeamglobal";
import { useEffect, useState } from "react";
import { INITIAL_UPSERT_TEAMGLOBAL_DTO } from "../utils/initialDtos";
import type { UpsertTeamglobalDto } from "../dtos/upsertTeamglobal.dto";
import type { FieldStatusType } from "../types/FieldStatus.type";
import type { TeamglobalType } from "../types/Teamglobal.type";
import { MethodEnum } from "../enums/Method.enum";
import { URL_TEAMGLOBAL, URL_TEAMGLOBAL_ID } from "../config/urls";
import type { AxiosError } from "axios";
import {
  GENERAL_FIELD_VALIDATION_MESSAGES,
  TEAMGLOBAL_MESSAGES,
} from "../utils/messages";
import { NotificationEnum } from "../enums/Notification.enum";
import { TeamglobalRoutesEnum } from "../routes/teamglobal.routes";
import { useManagerglobal } from "./useManagerglobal";
import type { FieldValidationType } from "../types/FieldValidationType";
import { TEAMGLOBAL } from "../config/constants";
import { FieldStateEnum } from "../enums/FieldState.enum";
import { validateImage } from "../utils/validateImage";
import { SelectTableFilterEnum } from "../enums/SelectTableFilter.enum";
import { KeyboardKeyEnum } from "../enums/KeyboardKey.enum";
import { defaultErrorNotification } from "../utils/defaultErrorNotification";

export const useUpsertTeamglobal = (teamglobalId?: string) => {
  const { setNotification } = useGlobalReducer();

  const { teamglobal, setTeamglobal } = useTeamglobalReducer();

  const { fetchTeamglobals } = useTeamglobal();
  const {
    fetchManagerglobals,
    handleSearch: handleSearchManagerglobals,
    loadingManagerglobals,
    managerglobalsFiltered,
  } = useManagerglobal();
  const {
    fetchPlayerglobals,
    handleSearch: handleSearchPlayerglobals,
    loadingPlayerglobals,
    playerglobalsFiltered,
  } = usePlayerglobal();
  const { loadingCountries, countries } = useCountry();

  const { request, loadingRequest } = useRequest();
  const navigate = useNavigate();

  const [loadingTeamglobal, setLoadingTeamglobal] = useState<boolean>(true);
  const [isValidImage, setIsValidImage] = useState<boolean>(true);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [upsertTeamglobal, setUpsertTeamglobal] = useState<UpsertTeamglobalDto>(
    INITIAL_UPSERT_TEAMGLOBAL_DTO,
  );

  const [fieldsStatus, setFieldsStatus] = useState<FieldStatusType[]>([]);
  const [managerglobalsFilter, setManagerglobalsFilter] =
    useState<SelectTableFilterEnum>(SelectTableFilterEnum.Available);
  const [playerglobalsFilter, setPlayerglobalsFilter] =
    useState<SelectTableFilterEnum>(SelectTableFilterEnum.Available);

  const [countrySelectValidationMessage, setCountrySelectValidationMessage] =
    useState<string>("");
  const [
    managerglobalSelectValidationMessage,
    setManagerglobalSelectValidationMessage,
  ] = useState<string>("");
  const [
    playerglobalsSelectValidationMessage,
    setPlayerglobalsSelectValidationMessage,
  ] = useState<string>("");

  const [openModalLineupglobals, setOpenModalLineupglobals] =
    useState<boolean>(false);

  useEffect(() => {
    if (teamglobalId) {
      const findAndSetTeamglobalReducer = async (teamglobalId: string) => {
        await request<TeamglobalType>({
          method: MethodEnum.Get,
          url: URL_TEAMGLOBAL_ID.replace(":teamglobalId", teamglobalId),
          timeout: 1000,
        })
          .then(async (data) => {
            setTeamglobal(data);
            setLoadingTeamglobal(false);
          })
          .catch((error: AxiosError) => {
            defaultErrorNotification(error, setNotification);

            navigate(TeamglobalRoutesEnum.Teamglobals);
          });
      };

      setIsUpdate(true);
      findAndSetTeamglobalReducer(teamglobalId);
    } else {
      setIsUpdate(false);
      setTeamglobal(undefined);
      setLoadingTeamglobal(false);
    }
  }, [teamglobalId]);

  useEffect(() => {
    if (teamglobal) {
      setUpsertTeamglobal({
        name: teamglobal.name,
        abbreviation: teamglobal.abbreviation,
        imageUrl: teamglobal.imageUrl || "",
        countryId: teamglobal.country!.id,
        managerglobalId: teamglobal.managerglobal!.id,
        playerglobalIds: teamglobal.playerglobals!.map(
          (playerglobal) => playerglobal.id,
        ),
      });

      const fieldsToValidate: FieldValidationType[] = [
        {
          id: "imageUrl",
          value: teamglobal.imageUrl || "",
        },
      ];

      fieldsToValidate.forEach((item) => {
        handleValidate(item);
      });
    } else {
      setUpsertTeamglobal(INITIAL_UPSERT_TEAMGLOBAL_DTO);
      setFieldsStatus([]);
      setManagerglobalsFilter(SelectTableFilterEnum.Available);
      setPlayerglobalsFilter(SelectTableFilterEnum.Available);
      setCountrySelectValidationMessage("");
      setManagerglobalSelectValidationMessage("");
      setPlayerglobalsSelectValidationMessage("");
    }
  }, [teamglobal]);

  useEffect(() => {
    if (
      upsertTeamglobal.name.length >= TEAMGLOBAL.NAME.MIN &&
      upsertTeamglobal.name.length <= TEAMGLOBAL.NAME.MAX &&
      upsertTeamglobal.abbreviation.length >= TEAMGLOBAL.ABBREVIATION.MIN &&
      upsertTeamglobal.abbreviation.length <= TEAMGLOBAL.ABBREVIATION.MAX &&
      isValidImage &&
      upsertTeamglobal.countryId &&
      upsertTeamglobal.managerglobalId &&
      upsertTeamglobal.playerglobalIds.length >= TEAMGLOBAL.PLAYERGLOBALS.MIN &&
      upsertTeamglobal.playerglobalIds.length <= TEAMGLOBAL.PLAYERGLOBALS.MAX
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [upsertTeamglobal, isValidImage]);

  const validateInputField = (
    id: string,
    value: string,
    input: HTMLInputElement,
  ) => {
    if (!["name", "abbreviation"].includes(id)) {
      return;
    }

    const isValid = () => {
      input.setCustomValidity("");
      setFieldsStatus((prev) => prev.filter((item) => item.id !== id));
    };

    if (!value) {
      input.setCustomValidity(GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED);
      setFieldsStatus((prev) => [
        ...prev,
        { id: id, state: FieldStateEnum.Invalid },
      ]);
    } else if (id === "name") {
      if (value.length < TEAMGLOBAL.NAME.MIN) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MIN_CHARACTER(TEAMGLOBAL.NAME.MIN),
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: id, state: FieldStateEnum.Invalid },
        ]);
      } else if (value.length > TEAMGLOBAL.NAME.MAX) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MAX_CHARACTER(TEAMGLOBAL.NAME.MAX),
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: id, state: FieldStateEnum.Invalid },
        ]);
      } else {
        isValid();
      }
    } else if (id === "abbreviation") {
      if (value.length < TEAMGLOBAL.ABBREVIATION.MIN) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MIN_CHARACTER(
            TEAMGLOBAL.ABBREVIATION.MIN,
          ),
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: id, state: FieldStateEnum.Invalid },
        ]);
      } else if (value.length > TEAMGLOBAL.ABBREVIATION.MAX) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MAX_CHARACTER(
            TEAMGLOBAL.ABBREVIATION.MAX,
          ),
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: id, state: FieldStateEnum.Invalid },
        ]);
      } else {
        isValid();
      }
    } else {
      isValid();
    }

    input.reportValidity();
  };

  const handleValidate = async ({ id, value }: FieldValidationType) => {
    if (id === "imageUrl") {
      const input = document.getElementById(id) as HTMLInputElement;

      if (!input) return;

      if (value) {
        const isValid = await validateImage(value);

        if (!isValid) {
          input.setCustomValidity(
            GENERAL_FIELD_VALIDATION_MESSAGES.IMAGE_URL_IS_INVALID,
          );
          setFieldsStatus((prev) => [
            ...prev,
            { id: id, state: FieldStateEnum.Invalid },
          ]);
        } else {
          input.setCustomValidity("");
          setFieldsStatus((prev) => prev.filter((item) => item.id !== id));
        }

        setIsValidImage(isValid);
      } else {
        input.setCustomValidity("");
        setFieldsStatus((prev) => prev.filter((item) => item.id !== id));

        setIsValidImage(true);
      }

      input.reportValidity();
    }
  };

  const handleChangeInput = async (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    const input = e.target;
    const value = input.value;

    setUpsertTeamglobal({
      ...upsertTeamglobal,
      [name]: name === "abbreviation" ? value.toUpperCase() : value,
    });

    if (name === "imageUrl") {
      if (value) {
        const isValid = await validateImage(value);

        if (!isValid) {
          input.setCustomValidity(
            GENERAL_FIELD_VALIDATION_MESSAGES.IMAGE_URL_IS_INVALID,
          );
          setFieldsStatus((prev) => [
            ...prev,
            { id: name, state: FieldStateEnum.Invalid },
          ]);
        } else {
          input.setCustomValidity("");
          setFieldsStatus((prev) => prev.filter((item) => item.id !== name));
        }

        setIsValidImage(isValid);
      } else {
        input.setCustomValidity("");
        setFieldsStatus((prev) => prev.filter((item) => item.id !== name));
        setIsValidImage(true);
      }

      input.reportValidity();
    } else {
      validateInputField(name, value, input);
    }
  };

  const handleChangeCountrySelect = (value: string) => {
    const newValue = value ? value : undefined;

    setUpsertTeamglobal({
      ...upsertTeamglobal,
      countryId: newValue,
    });

    if (!newValue) {
      setCountrySelectValidationMessage(
        GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED,
      );
      setFieldsStatus((prev) => [
        ...prev,
        { id: "countryId", state: FieldStateEnum.Invalid },
      ]);
    } else {
      setCountrySelectValidationMessage("");
      setFieldsStatus((prev) => prev.filter((item) => item.id !== "countryId"));
    }
  };

  const handleChangeManagerglobalSelect = (value: string) => {
    const newValue = value ? value : undefined;

    setUpsertTeamglobal({
      ...upsertTeamglobal,
      managerglobalId: newValue,
    });

    if (!newValue) {
      setManagerglobalSelectValidationMessage(
        GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED,
      );
      setFieldsStatus((prev) => [
        ...prev,
        { id: "managerglobalId", state: FieldStateEnum.Invalid },
      ]);
    } else {
      setManagerglobalSelectValidationMessage("");
      setFieldsStatus((prev) =>
        prev.filter((item) => item.id !== "managerglobalId"),
      );
    }
  };

  const handleChangePlayerglobalsSelect = (values: string[]) => {
    setUpsertTeamglobal({
      ...upsertTeamglobal,
      playerglobalIds: values,
    });

    if (values.length === 0) {
      setPlayerglobalsSelectValidationMessage(
        GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED_CHECKBOX,
      );
      setFieldsStatus((prev) => [
        ...prev,
        { id: "playerglobalIds", state: FieldStateEnum.Invalid },
      ]);
    } else if (
      values.length < TEAMGLOBAL.PLAYERGLOBALS.MIN ||
      values.length > TEAMGLOBAL.PLAYERGLOBALS.MAX
    ) {
      setPlayerglobalsSelectValidationMessage(
        GENERAL_FIELD_VALIDATION_MESSAGES.OPTIONS(
          TEAMGLOBAL.PLAYERGLOBALS.MIN,
          TEAMGLOBAL.PLAYERGLOBALS.MAX,
        ),
      );
      setFieldsStatus((prev) => [
        ...prev,
        { id: "playerglobalIds", state: FieldStateEnum.Invalid },
      ]);
    } else {
      setPlayerglobalsSelectValidationMessage("");
      setFieldsStatus((prev) =>
        prev.filter((item) => item.id !== "playerglobalIds"),
      );
    }
  };

  const handleUpsertTeamglobal = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      ...upsertTeamglobal,
      imageUrl:
        upsertTeamglobal.imageUrl === "" ? null : upsertTeamglobal.imageUrl,
    };

    if (teamglobalId) {
      await request<TeamglobalType>({
        method: MethodEnum.Put,
        url: URL_TEAMGLOBAL_ID.replace(":teamglobalId", teamglobalId),
        body: body,
        timeout: 1000,
      })
        .then(async () => {
          await fetchTeamglobals();
          await fetchManagerglobals();
          await fetchPlayerglobals();

          setNotification({
            message: TEAMGLOBAL_MESSAGES.SUCCESS.UPDATE,
            type: NotificationEnum.Success,
          });

          navigate(TeamglobalRoutesEnum.Teamglobals);
        })
        .catch((error: AxiosError) => {
          defaultErrorNotification(error, setNotification);
        });
    } else {
      await request<TeamglobalType>({
        method: MethodEnum.Post,
        url: URL_TEAMGLOBAL,
        body: body,
        timeout: 1000,
      })
        .then(async () => {
          await fetchTeamglobals();
          await fetchManagerglobals();
          await fetchPlayerglobals();

          setNotification({
            message: TEAMGLOBAL_MESSAGES.SUCCESS.CREATE,
            type: NotificationEnum.Success,
          });

          navigate(TeamglobalRoutesEnum.Teamglobals);
        })
        .catch((error: AxiosError) => {
          defaultErrorNotification(error, setNotification);
        });
    }
  };

  const handleReset = () => {
    setUpsertTeamglobal(INITIAL_UPSERT_TEAMGLOBAL_DTO);
    setIsValidImage(true);
    setFieldsStatus([]);
    setManagerglobalsFilter(SelectTableFilterEnum.Available);
    setPlayerglobalsFilter(SelectTableFilterEnum.Available);
    setCountrySelectValidationMessage("");
    setManagerglobalSelectValidationMessage("");
    setPlayerglobalsSelectValidationMessage("");
  };

  const handleCancel = () => {
    navigate(TeamglobalRoutesEnum.Teamglobals);
  };

  const handleLineupglobals = (teamglobalId: string) => {
    navigate(
      TeamglobalRoutesEnum.Lineupglobals.replace(":teamglobalId", teamglobalId),
    );
  };

  const handleCloseModalLineupglobals = () => {
    setOpenModalLineupglobals(false);
  };

  const handleOpenModalLineupglobals = () => {
    setOpenModalLineupglobals(true);
  };

  const handlePreventSubmitOnEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === KeyboardKeyEnum.Enter) {
      e.preventDefault();
    }
  };

  return {
    upsertTeamglobal,
    loadingTeamglobal,
    loadingRequest,
    disabledButton,
    isUpdate,
    fieldsStatus,
    managerglobalsFilter,
    playerglobalsFilter,
    countrySelectValidationMessage,
    managerglobalSelectValidationMessage,
    playerglobalsSelectValidationMessage,
    loadingCountries,
    countries,
    loadingManagerglobals,
    managerglobalsFiltered,
    loadingPlayerglobals,
    playerglobalsFiltered,
    openModalLineupglobals,
    handleSearchManagerglobals,
    handleSearchPlayerglobals,
    setManagerglobalsFilter,
    setPlayerglobalsFilter,
    handleChangeInput,
    handleChangeCountrySelect,
    handleChangeManagerglobalSelect,
    handleChangePlayerglobalsSelect,
    handleUpsertTeamglobal,
    handleReset,
    handleCancel,
    handleLineupglobals,
    handleOpenModalLineupglobals,
    handleCloseModalLineupglobals,
    handlePreventSubmitOnEnter,
  };
};
