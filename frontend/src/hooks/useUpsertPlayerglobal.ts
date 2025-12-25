import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { usePlayerglobalReducer } from "../store/reducers/playerglobalReducer/usePlayerglobalReducer";
import { useRequest } from "../utils/request";
import { useCountry } from "./useCountry";
import { usePlayerglobal } from "./usePlayerglobal";
import { useEffect, useState } from "react";
import type { UpsertPlayerglobalDto } from "../dtos/upsertPlayerglobal.dto";
import { INITIAL_UPSERT_PLAYERGLOBAL_DTO } from "../utils/initialDtos";
import type { FieldStatusType } from "../types/FieldStatus.type";
import { URL_PLAYERGLOBAL, URL_PLAYERGLOBAL_ID } from "../config/urls";
import { MethodEnum } from "../enums/Method.enum";
import type { PlayerglobalType } from "../types/Playerglobal.type";
import type { AxiosError } from "axios";
import {
  GENERAL_FIELD_VALIDATION_MESSAGES,
  OTHER_MESSAGES,
  PLAYERGLOBAL_MESSAGES,
} from "../utils/messages";
import { NotificationEnum } from "../enums/Notification.enum";
import { PlayerglobalRoutesEnum } from "../routes/playerglobal.routes";
import type { FieldValidationType } from "../types/FieldValidationType";
import { isWithinAgeRange } from "../utils/isWithinAgeRange";
import { PLAYERGLOBAL } from "../config/constants";
import { FieldStateEnum } from "../enums/FieldState.enum";
import { validateImage } from "../utils/validateImage";
import { usePosition } from "./usePosition";

export const useUpsertPlayerglobal = (playerglobalId?: string) => {
  const { setNotification } = useGlobalReducer();

  const { playerglobal, setPlayerglobal } = usePlayerglobalReducer();

  const { fetchPlayerglobals } = usePlayerglobal();
  const { loadingCountries, countries } = useCountry();
  const { loadingPositions, positions } = usePosition();

  const { request, loadingRequest } = useRequest();
  const navigate = useNavigate();

  const [loadingPlayerglobal, setLoadingPlayerglobal] = useState<boolean>(true);
  const [isValidImage, setIsValidImage] = useState<boolean>(true);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [upsertPlayerglobal, setUpsertPlayerglobal] =
    useState<UpsertPlayerglobalDto>(INITIAL_UPSERT_PLAYERGLOBAL_DTO);

  const [fieldsStatus, setFieldsStatus] = useState<FieldStatusType[]>([]);

  const [birthdateInputValidationMessage, setBirthdateInputValidationMessage] =
    useState<string>("");
  const [countrySelectValidationMessage, setCountrySelectValidationMessage] =
    useState<string>("");
  const [
    primaryPositionSelectValidationMessage,
    setPrimaryPositionSelectValidationMessage,
  ] = useState<string>("");
  const [
    secondaryPositionSelectValidationMessage,
    setSecondaryPositionSelectValidationMessage,
  ] = useState<string>("");

  useEffect(() => {
    if (playerglobalId) {
      const findAndSetPlayerglobalReducer = async (playerglobalId: string) => {
        await request<PlayerglobalType>({
          method: MethodEnum.Get,
          url: URL_PLAYERGLOBAL_ID.replace(":playerglobalId", playerglobalId),
          timeout: 1000,
        })
          .then(async (data) => {
            setPlayerglobal(data);
            setLoadingPlayerglobal(false);
          })
          .catch((error: AxiosError) => {
            const responseErrorMessage =
              (error.response?.data as string) || OTHER_MESSAGES.DEFAULT_ERROR;

            setNotification({
              message: responseErrorMessage,
              type: NotificationEnum.Error,
            });

            navigate(PlayerglobalRoutesEnum.Playerglobals);
          });
      };

      setIsUpdate(true);
      findAndSetPlayerglobalReducer(playerglobalId);
    } else {
      setIsUpdate(false);
      setPlayerglobal(undefined);
      setLoadingPlayerglobal(false);
    }
  }, [playerglobalId]);

  useEffect(() => {
    if (playerglobal) {
      setUpsertPlayerglobal({
        name: playerglobal.name,
        imageUrl: playerglobal.imageUrl || "",
        birthdate: playerglobal.birthdate,
        overall: playerglobal.overall,
        countryId: playerglobal.country!.id,
        primaryPositionIds: playerglobal
          .playerglobalPositions!.filter(
            (playerglobalPosition) => playerglobalPosition.isPrimary
          )
          .map((playerglobalPosition) => playerglobalPosition.position!.id),
        secondaryPositionIds: playerglobal
          .playerglobalPositions!.filter(
            (playerglobalPosition) => !playerglobalPosition.isPrimary
          )
          .map((playerglobalPosition) => playerglobalPosition.position!.id),
      });

      const fieldsToValidate: FieldValidationType[] = [
        {
          id: "imageUrl",
          value: playerglobal.imageUrl || "",
        },
        {
          id: "birthdate",
          value: playerglobal.birthdate,
        },
      ];

      fieldsToValidate.forEach((item) => {
        handleValidate(item);
      });
    } else {
      setUpsertPlayerglobal(INITIAL_UPSERT_PLAYERGLOBAL_DTO);
      setFieldsStatus([]);
      setBirthdateInputValidationMessage("");
      setCountrySelectValidationMessage("");
      setPrimaryPositionSelectValidationMessage("");
      setSecondaryPositionSelectValidationMessage("");
    }
  }, [playerglobal]);

  useEffect(() => {
    const hasCommonPositionId = upsertPlayerglobal.primaryPositionIds.some(
      (positionId) =>
        upsertPlayerglobal.secondaryPositionIds.includes(positionId)
    );

    if (
      upsertPlayerglobal.name.length >= PLAYERGLOBAL.NAME.MIN &&
      upsertPlayerglobal.name.length <= PLAYERGLOBAL.NAME.MAX &&
      isValidImage &&
      upsertPlayerglobal.birthdate &&
      isWithinAgeRange(
        upsertPlayerglobal.birthdate,
        PLAYERGLOBAL.AGE.MIN,
        PLAYERGLOBAL.AGE.MAX
      ) &&
      upsertPlayerglobal.overall >= PLAYERGLOBAL.OVERALL.MIN &&
      upsertPlayerglobal.overall <= PLAYERGLOBAL.OVERALL.MAX &&
      upsertPlayerglobal.primaryPositionIds.length >=
        PLAYERGLOBAL.PRIMARY_POSITIONS.MIN &&
      upsertPlayerglobal.primaryPositionIds.length <=
        PLAYERGLOBAL.PRIMARY_POSITIONS.MAX &&
      upsertPlayerglobal.secondaryPositionIds.length >=
        PLAYERGLOBAL.SECONDARY_POSITIONS.MIN &&
      upsertPlayerglobal.secondaryPositionIds.length <=
        PLAYERGLOBAL.SECONDARY_POSITIONS.MAX &&
      !hasCommonPositionId &&
      upsertPlayerglobal.countryId
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [upsertPlayerglobal, isValidImage]);

  const validateInputField = (
    id: string,
    value: string,
    input: HTMLInputElement
  ) => {
    if (!["name", "overall"].includes(id)) {
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
      if (value.length < PLAYERGLOBAL.NAME.MIN) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MIN_CHARACTER(PLAYERGLOBAL.NAME.MIN)
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: id, state: FieldStateEnum.Invalid },
        ]);
      } else if (value.length > PLAYERGLOBAL.NAME.MAX) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MAX_CHARACTER(PLAYERGLOBAL.NAME.MAX)
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: id, state: FieldStateEnum.Invalid },
        ]);
      } else {
        isValid();
      }
    } else if (id === "overall") {
      const numericValue = Number(value);

      if (numericValue < PLAYERGLOBAL.OVERALL.MIN) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MIN(PLAYERGLOBAL.OVERALL.MIN)
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: id, state: FieldStateEnum.Invalid },
        ]);
      } else if (numericValue > PLAYERGLOBAL.OVERALL.MAX) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MAX(PLAYERGLOBAL.OVERALL.MAX)
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
    if (id === "birthdate") {
      if (!value) {
        setBirthdateInputValidationMessage(
          GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: "birthdate", state: FieldStateEnum.Invalid },
        ]);
      } else if (
        !isWithinAgeRange(value, PLAYERGLOBAL.AGE.MIN, PLAYERGLOBAL.AGE.MAX)
      ) {
        setBirthdateInputValidationMessage(
          GENERAL_FIELD_VALIDATION_MESSAGES.BIRTHDATE(
            PLAYERGLOBAL.AGE.MIN,
            PLAYERGLOBAL.AGE.MAX
          )
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: "birthdate", state: FieldStateEnum.Invalid },
        ]);
      } else {
        setBirthdateInputValidationMessage("");
        setFieldsStatus((prev) =>
          prev.filter((item) => item.id !== "birthdate")
        );
      }
    } else if (id === "imageUrl") {
      const input = document.getElementById(id) as HTMLInputElement;

      if (!input) return;

      if (value) {
        const isValid = await validateImage(value);

        if (!isValid) {
          input.setCustomValidity(
            GENERAL_FIELD_VALIDATION_MESSAGES.IMAGE_URL_IS_INVALID
          );
          setFieldsStatus((prev) => [
            ...prev,
            { id: "imageUrl", state: FieldStateEnum.Invalid },
          ]);
        } else {
          input.setCustomValidity("");
          setFieldsStatus((prev) =>
            prev.filter((item) => item.id !== "imageUrl")
          );
        }

        setIsValidImage(isValid);
      } else {
        input.setCustomValidity("");
        setFieldsStatus((prev) =>
          prev.filter((item) => item.id !== "imageUrl")
        );

        setIsValidImage(true);
      }

      input.reportValidity();
    }
  };

  const handleChangeInput = async (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const input = e.target;
    const value = input.value;

    setUpsertPlayerglobal({
      ...upsertPlayerglobal,
      [name]: name === "overall" ? (value ? Number(value) : 0) : value,
    });

    if (name === "imageUrl") {
      if (value) {
        const isValid = await validateImage(value);

        if (!isValid) {
          input.setCustomValidity(
            GENERAL_FIELD_VALIDATION_MESSAGES.IMAGE_URL_IS_INVALID
          );
          setFieldsStatus((prev) => [
            ...prev,
            { id: "imageUrl", state: FieldStateEnum.Invalid },
          ]);
        } else {
          input.setCustomValidity("");
          setFieldsStatus((prev) =>
            prev.filter((item) => item.id !== "imageUrl")
          );
        }

        setIsValidImage(isValid);
      } else {
        input.setCustomValidity("");
        setFieldsStatus((prev) =>
          prev.filter((item) => item.id !== "imageUrl")
        );
        setIsValidImage(true);
      }

      input.reportValidity();
    } else if (name === "overall") {
      validateInputField(name, !value ? "0" : value, input);
    } else {
      validateInputField(name, value, input);
    }
  };

  const handleChangeBirthdateInput = (value: string) => {
    setUpsertPlayerglobal({
      ...upsertPlayerglobal,
      birthdate: value,
    });

    if (!value) {
      setBirthdateInputValidationMessage(
        GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED
      );
      setFieldsStatus((prev) => [
        ...prev,
        { id: "birthdate", state: FieldStateEnum.Invalid },
      ]);
    } else if (
      !isWithinAgeRange(value, PLAYERGLOBAL.AGE.MIN, PLAYERGLOBAL.AGE.MAX)
    ) {
      setBirthdateInputValidationMessage(
        GENERAL_FIELD_VALIDATION_MESSAGES.BIRTHDATE(
          PLAYERGLOBAL.AGE.MIN,
          PLAYERGLOBAL.AGE.MAX
        )
      );
      setFieldsStatus((prev) => [
        ...prev,
        { id: "birthdate", state: FieldStateEnum.Invalid },
      ]);
    } else {
      setBirthdateInputValidationMessage("");
      setFieldsStatus((prev) => prev.filter((item) => item.id !== "birthdate"));
    }
  };

  const handleChangeCountrySelect = (value: string) => {
    const newValue = value ? value : undefined;

    setUpsertPlayerglobal({
      ...upsertPlayerglobal,
      countryId: newValue,
    });

    if (!newValue) {
      setCountrySelectValidationMessage(
        GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED
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

  const handleChangePrimaryPositionsSelect = (values: string[]) => {
    setUpsertPlayerglobal({
      ...upsertPlayerglobal,
      primaryPositionIds: values,
    });

    if (values.length === 0) {
      setPrimaryPositionSelectValidationMessage(
        GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED
      );
      setFieldsStatus((prev) => [
        ...prev,
        { id: "primaryPositionIds", state: FieldStateEnum.Invalid },
      ]);
    } else if (
      values.length < PLAYERGLOBAL.PRIMARY_POSITIONS.MIN ||
      values.length > PLAYERGLOBAL.PRIMARY_POSITIONS.MAX
    ) {
      setPrimaryPositionSelectValidationMessage(
        PLAYERGLOBAL_MESSAGES.FIELD_VALIDATION.PRIMARY_POSITIONS(
          PLAYERGLOBAL.PRIMARY_POSITIONS.MIN,
          PLAYERGLOBAL.PRIMARY_POSITIONS.MAX
        )
      );
      setFieldsStatus((prev) => [
        ...prev,
        { id: "primaryPositionIds", state: FieldStateEnum.Invalid },
      ]);
    } else {
      setPrimaryPositionSelectValidationMessage("");
      setFieldsStatus((prev) =>
        prev.filter((item) => item.id !== "primaryPositionIds")
      );
    }
  };

  const handleChangeSecondaryPositionsSelect = (values: string[]) => {
    setUpsertPlayerglobal({
      ...upsertPlayerglobal,
      secondaryPositionIds: values,
    });

    if (values.length === 0 && PLAYERGLOBAL.SECONDARY_POSITIONS.MIN > 0) {
      setSecondaryPositionSelectValidationMessage(
        GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED
      );
      setFieldsStatus((prev) => [
        ...prev,
        { id: "secondaryPositionIds", state: FieldStateEnum.Invalid },
      ]);
    } else if (
      values.length < PLAYERGLOBAL.SECONDARY_POSITIONS.MIN ||
      values.length > PLAYERGLOBAL.SECONDARY_POSITIONS.MAX
    ) {
      setSecondaryPositionSelectValidationMessage(
        PLAYERGLOBAL_MESSAGES.FIELD_VALIDATION.SECONDARY_POSITIONS(
          PLAYERGLOBAL.SECONDARY_POSITIONS.MIN,
          PLAYERGLOBAL.SECONDARY_POSITIONS.MAX
        )
      );
      setFieldsStatus((prev) => [
        ...prev,
        { id: "secondaryPositionIds", state: FieldStateEnum.Invalid },
      ]);
    } else {
      setSecondaryPositionSelectValidationMessage("");
      setFieldsStatus((prev) =>
        prev.filter((item) => item.id !== "secondaryPositionIds")
      );
    }
  };

  const handleUpsertPlayerglobal = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      ...upsertPlayerglobal,
      imageUrl:
        upsertPlayerglobal.imageUrl === "" ? null : upsertPlayerglobal.imageUrl,
    };

    if (playerglobalId) {
      await request<PlayerglobalType>({
        method: MethodEnum.Put,
        url: URL_PLAYERGLOBAL_ID.replace(":playerglobalId", playerglobalId),
        body: body,
        timeout: 1000,
      })
        .then(async () => {
          await fetchPlayerglobals();

          setNotification({
            message: PLAYERGLOBAL_MESSAGES.SUCCESS.UPDATE,
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
    } else {
      await request<PlayerglobalType>({
        method: MethodEnum.Post,
        url: URL_PLAYERGLOBAL,
        body: body,
        timeout: 1000,
      })
        .then(async () => {
          await fetchPlayerglobals();

          setNotification({
            message: PLAYERGLOBAL_MESSAGES.SUCCESS.CREATE,
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
    }

    navigate(PlayerglobalRoutesEnum.Playerglobals);
  };

  const handleReset = () => {
    setUpsertPlayerglobal(INITIAL_UPSERT_PLAYERGLOBAL_DTO);
    setIsValidImage(true);
    setFieldsStatus([]);
    setBirthdateInputValidationMessage("");
    setCountrySelectValidationMessage("");
    setPrimaryPositionSelectValidationMessage("");
    setSecondaryPositionSelectValidationMessage("");
  };

  const handleCancel = () => {
    navigate(PlayerglobalRoutesEnum.Playerglobals);
  };

  return {
    upsertPlayerglobal,
    loadingPlayerglobal,
    loadingRequest,
    imageUrl: upsertPlayerglobal.imageUrl,
    primaryPositionIds: upsertPlayerglobal.primaryPositionIds,
    secondaryPositionIds: upsertPlayerglobal.secondaryPositionIds,
    disabledButton,
    isUpdate,
    fieldsStatus,
    birthdateInputValidationMessage,
    countrySelectValidationMessage,
    primaryPositionSelectValidationMessage,
    secondaryPositionSelectValidationMessage,
    loadingCountries,
    countries,
    loadingPositions,
    positions,
    handleChangeInput,
    handleChangeBirthdateInput,
    handleChangeCountrySelect,
    handleChangePrimaryPositionsSelect,
    handleChangeSecondaryPositionsSelect,
    handleUpsertPlayerglobal,
    handleReset,
    handleCancel,
  };
};
