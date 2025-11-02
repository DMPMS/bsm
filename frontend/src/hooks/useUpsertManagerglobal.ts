import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { useRequest } from "../utils/request";
import { useCountry } from "./useCountry";
import { useManagerglobal } from "./useManagerglobal";
import { useEffect, useState } from "react";
import type { UpsertManagerglobalDto } from "../dtos/upsertManagerglobal.dto";
import { INITIAL_UPSERT_MANAGERGLOBAL_DTO } from "../utils/initialDtos";
import { MANAGERGLOBAL } from "../config/constants";
import { isWithinAgeRange } from "../utils/isWithinAgeRange";
import type { ManagerglobalType } from "../types/Managerglobal.type";
import { MethodEnum } from "../enums/Method.enum";
import { URL_MANAGERGLOBAL, URL_MANAGERGLOBAL_ID } from "../config/urls";
import type { AxiosError } from "axios";
import {
  GENERAL_FIELD_VALIDATION_MESSAGES,
  MANAGERGLOBAL_MESSAGES,
  OTHER_MESSAGES,
} from "../utils/messages";
import { NotificationEnum } from "../enums/Notification.enum";
import { ManagerglobalRoutesEnum } from "../routes/managerglobal.routes";
import type { FieldValidationType } from "../types/FieldValidationType";
import { useTeamglobal } from "./useTeamglobal";
import { validateImage } from "../utils/validateImage";
import { useManagerglobalReducer } from "../store/reducers/managerglobalReducer/useManagerglobalReducer";

export const useUpsertManagerGlobal = (managerglobalId?: string) => {
  const { setNotification } = useGlobalReducer();

  const { managerglobal, setManagerglobal } = useManagerglobalReducer();

  const { fetchManagerglobals } = useManagerglobal();
  const { fetchTeamglobals } = useTeamglobal();
  const { loadingCountries, countries } = useCountry();

  const { request, loadingRequest } = useRequest();
  const navigate = useNavigate();

  const [loadingManagerglobal, setLoadingManagerglobal] =
    useState<boolean>(true);
  const [isValidImage, setIsValidImage] = useState<boolean>(true);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [upsertManagerglobal, setUpsertManagerglobal] =
    useState<UpsertManagerglobalDto>(INITIAL_UPSERT_MANAGERGLOBAL_DTO);

  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [warningFields, setWarningFields] = useState<string[]>([]);

  const [birthdateInputValidationMessage, setBirthdateInputValidationMessage] =
    useState<string>("");
  const [countrySelectValidationMessage, setCountrySelectValidationMessage] =
    useState<string>("");

  useEffect(() => {
    if (managerglobalId) {
      const findAndSetManagerglobalReducer = async (
        managerglobalId: string
      ) => {
        await request<ManagerglobalType>({
          method: MethodEnum.Get,
          url: URL_MANAGERGLOBAL_ID.replace(
            ":managerglobalId",
            managerglobalId
          ),
          timeout: 1000,
        })
          .then(async (data) => {
            setManagerglobal(data);
            setLoadingManagerglobal(false);
          })
          .catch((error: AxiosError) => {
            const responseErrorMessage =
              (error.response?.data as string) || OTHER_MESSAGES.DEFAULT_ERROR;

            setNotification({
              message: responseErrorMessage,
              type: NotificationEnum.Error,
            });

            navigate(ManagerglobalRoutesEnum.Managerglobals);
          });
      };

      setIsUpdate(true);
      findAndSetManagerglobalReducer(managerglobalId);
    } else {
      setIsUpdate(false);
      setManagerglobal(undefined);
      setLoadingManagerglobal(false);
    }
  }, [managerglobalId]);

  useEffect(() => {
    if (managerglobal) {
      setUpsertManagerglobal({
        name: managerglobal.name,
        imageUrl: managerglobal.imageUrl || "",
        birthdate: managerglobal.birthdate,
        countryId: managerglobal.country!.id,
      });

      const fieldsToValidate: FieldValidationType[] = [
        {
          id: "imageUrl",
          value: managerglobal.imageUrl || "",
        },
        {
          id: "birthdate",
          value: managerglobal.birthdate,
        },
      ];

      fieldsToValidate.forEach((item) => {
        handleValidate(item);
      });
    } else {
      setUpsertManagerglobal(INITIAL_UPSERT_MANAGERGLOBAL_DTO);
      setInvalidFields([]);
      setWarningFields([]);
    }
  }, [managerglobal]);

  useEffect(() => {
    if (
      upsertManagerglobal.name.length >= MANAGERGLOBAL.NAME.MIN &&
      upsertManagerglobal.name.length <= MANAGERGLOBAL.NAME.MAX &&
      isValidImage &&
      upsertManagerglobal.birthdate &&
      isWithinAgeRange(
        upsertManagerglobal.birthdate,
        MANAGERGLOBAL.AGE.MIN,
        MANAGERGLOBAL.AGE.MAX
      ) &&
      upsertManagerglobal.countryId
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [upsertManagerglobal, isValidImage]);

  const validateInputField = (
    name: string,
    value: string,
    input: HTMLInputElement
  ) => {
    if (!["name"].includes(name)) {
      return;
    }

    const isValid = () => {
      input.setCustomValidity("");
      setInvalidFields((prev) => prev.filter((item) => item !== name));
      setWarningFields((prev) => prev.filter((item) => item !== name));
    };

    if (!value) {
      input.setCustomValidity(GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED);
      setInvalidFields((prev) => [...prev, name]);
    } else if (name === "name") {
      if (value.length < MANAGERGLOBAL.NAME.MIN) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MIN_CHARACTER(
            MANAGERGLOBAL.NAME.MIN
          )
        );
        setInvalidFields((prev) => [...prev, name]);
      } else if (value.length > MANAGERGLOBAL.NAME.MAX) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MAX_CHARACTER(
            MANAGERGLOBAL.NAME.MAX
          )
        );
        setInvalidFields((prev) => [...prev, name]);
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
        setInvalidFields((prev) => [...prev, "birthdate"]);
      } else if (
        !isWithinAgeRange(value, MANAGERGLOBAL.AGE.MIN, MANAGERGLOBAL.AGE.MAX)
      ) {
        setBirthdateInputValidationMessage(
          GENERAL_FIELD_VALIDATION_MESSAGES.BIRTHDATE(
            MANAGERGLOBAL.AGE.MIN,
            MANAGERGLOBAL.AGE.MAX
          )
        );
        setInvalidFields((prev) => [...prev, "birthdate"]);
      } else {
        setBirthdateInputValidationMessage("");
        setInvalidFields((prev) => prev.filter((item) => item !== "birthdate"));
        setWarningFields((prev) => prev.filter((item) => item !== "birthdate"));
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
          setInvalidFields((prev) => [...prev, "imageUrl"]);
        } else {
          input.setCustomValidity("");
          setInvalidFields((prev) =>
            prev.filter((item) => item !== "imageUrl")
          );
          setWarningFields((prev) =>
            prev.filter((item) => item !== "imageUrl")
          );
        }

        setIsValidImage(isValid);
      } else {
        input.setCustomValidity("");
        setInvalidFields((prev) => prev.filter((item) => item !== "imageUrl"));
        setWarningFields((prev) => prev.filter((item) => item !== "imageUrl"));

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

    setUpsertManagerglobal({
      ...upsertManagerglobal,
      [name]: value,
    });

    if (name === "imageUrl") {
      if (value) {
        const isValid = await validateImage(value);

        if (!isValid) {
          input.setCustomValidity(
            GENERAL_FIELD_VALIDATION_MESSAGES.IMAGE_URL_IS_INVALID
          );
          setInvalidFields((prev) => [...prev, "imageUrl"]);
        } else {
          input.setCustomValidity("");
          setInvalidFields((prev) =>
            prev.filter((item) => item !== "imageUrl")
          );
          setWarningFields((prev) =>
            prev.filter((item) => item !== "imageUrl")
          );
        }

        setIsValidImage(isValid);
      } else {
        input.setCustomValidity("");
        setInvalidFields((prev) => prev.filter((item) => item !== "imageUrl"));
        setWarningFields((prev) => prev.filter((item) => item !== "imageUrl"));

        setIsValidImage(true);
      }

      input.reportValidity();
    } else {
      validateInputField(name, value, input);
    }
  };

  const handleChangeBirthdateInput = (value: string) => {
    setUpsertManagerglobal({
      ...upsertManagerglobal,
      birthdate: value,
    });

    if (!value) {
      setBirthdateInputValidationMessage(
        GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED
      );
      setInvalidFields((prev) => [...prev, "birthdate"]);
    } else if (
      !isWithinAgeRange(value, MANAGERGLOBAL.AGE.MIN, MANAGERGLOBAL.AGE.MAX)
    ) {
      setBirthdateInputValidationMessage(
        GENERAL_FIELD_VALIDATION_MESSAGES.BIRTHDATE(
          MANAGERGLOBAL.AGE.MIN,
          MANAGERGLOBAL.AGE.MAX
        )
      );
      setInvalidFields((prev) => [...prev, "birthdate"]);
    } else {
      setBirthdateInputValidationMessage("");
      setInvalidFields((prev) => prev.filter((item) => item !== "birthdate"));
      setWarningFields((prev) => prev.filter((item) => item !== "birthdate"));
    }
  };

  const handleChangeCountrySelect = (value: string) => {
    const newValue = value ? value : undefined;

    setUpsertManagerglobal({
      ...upsertManagerglobal,
      countryId: newValue,
    });

    if (!newValue) {
      setCountrySelectValidationMessage(
        GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED
      );
      setInvalidFields((prev) => [...prev, "countryId"]);
    } else {
      setCountrySelectValidationMessage("");
      setInvalidFields((prev) => prev.filter((item) => item !== "countryId"));
      setWarningFields((prev) => prev.filter((item) => item !== "countryId"));
    }
  };

  const handleUpsertManagerglobal = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      ...upsertManagerglobal,
      imageUrl:
        upsertManagerglobal.imageUrl === ""
          ? null
          : upsertManagerglobal.imageUrl,
    };

    if (managerglobalId) {
      await request<ManagerglobalType>({
        method: MethodEnum.Put,
        url: URL_MANAGERGLOBAL_ID.replace(":managerglobalId", managerglobalId),
        body: body,
        timeout: 1000,
      })
        .then(async () => {
          await fetchManagerglobals(0);
          await fetchTeamglobals(0);

          setNotification({
            message: MANAGERGLOBAL_MESSAGES.SUCCESS.UPDATE,
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
      await request<ManagerglobalType>({
        method: MethodEnum.Post,
        url: URL_MANAGERGLOBAL,
        body: body,
        timeout: 1000,
      })
        .then(async () => {
          await fetchManagerglobals(0);

          setNotification({
            message: MANAGERGLOBAL_MESSAGES.SUCCESS.CREATE,
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

    navigate(ManagerglobalRoutesEnum.Managerglobals);
  };

  const handleReset = () => {
    setUpsertManagerglobal(INITIAL_UPSERT_MANAGERGLOBAL_DTO);
    setIsValidImage(true);
    setInvalidFields([]);
    setWarningFields([]);
  };

  const handleCancel = () => {
    navigate(ManagerglobalRoutesEnum.Managerglobals);
  };

  return {
    upsertManagerglobal,
    loadingManagerglobal,
    loadingRequest,
    imageUrl: upsertManagerglobal.imageUrl,
    disabledButton,
    isUpdate,
    invalidFields,
    warningFields,
    birthdateInputValidationMessage,
    countrySelectValidationMessage,
    loadingCountries,
    countries,
    handleChangeInput,
    handleChangeBirthdateInput,
    handleChangeCountrySelect,
    handleUpsertManagerglobal,
    handleReset,
    handleCancel,
  };
};
