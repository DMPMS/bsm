import { useNavigate } from "react-router-dom";
import { useCompetitionglobalReducer } from "../store/reducers/competitionglobalReducer/useCompetitionglobalReducer";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { useRequest } from "../utils/request";
import { useCompetitionglobal } from "./useCompetitionglobal";
import { useRule } from "./useRule";
import { useTeamglobal } from "./useTeamglobal";
import { useEffect, useState } from "react";
import type { UpsertCompetitionglobalDto } from "../dtos/upsertCompetitionglobal.dto";
import { INITIAL_UPSERT_COMPETITIONGLOBAL_DTO } from "../utils/initialDtos";
import type { FieldStatusType } from "../types/FieldStatus.type";
import { SelectTableFilterEnum } from "../enums/SelectTableFilter.enum";
import { MethodEnum } from "../enums/Method.enum";
import {
  URL_COMPETITIONGLOBAL,
  URL_COMPETITIONGLOBAL_ID,
} from "../config/urls";
import type { CompetitionglobalType } from "../types/Competitionglobal.type";
import type { AxiosError } from "axios";
import {
  COMPETITIONGLOBAL_MESSAGES,
  GENERAL_FIELD_VALIDATION_MESSAGES,
  OTHER_MESSAGES,
} from "../utils/messages";
import { NotificationEnum } from "../enums/Notification.enum";
import { CompetitionglobalRoutesEnum } from "../routes/competitionglobal.routes";
import type { FieldValidationType } from "../types/FieldValidationType";
import { COMPETITIONGLOBAL } from "../config/constants";
import { FieldStateEnum } from "../enums/FieldState.enum";
import { validateImage } from "../utils/validateImage";
import { KeyboardKeyEnum } from "../enums/KeyboardKey.enum";
import type { RuleType } from "../types/Rule.type";

export const useUpsertCompetitionglobal = (competitionglobalId?: string) => {
  const { setNotification } = useGlobalReducer();

  const { competitionglobal, setCompetitionglobal } =
    useCompetitionglobalReducer();

  const { fetchCompetitionglobals } = useCompetitionglobal();
  const {
    fetchRules,
    handleSearch: handleSearchRules,
    loadingRules,
    rules,
  } = useRule();
  const {
    fetchTeamglobals,
    handleSearch: handleSearchTeamglobals,
    loadingTeamglobals,
    teamglobals,
  } = useTeamglobal();

  const { request, loadingRequest } = useRequest();
  const navigate = useNavigate();

  const [loadingCompetitionglobal, setLoadingCompetitionglobal] =
    useState<boolean>(true);
  const [isValidImage, setIsValidImage] = useState<boolean>(true);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [upsertCompetitionglobal, setUpsertCompetitionglobal] =
    useState<UpsertCompetitionglobalDto>(INITIAL_UPSERT_COMPETITIONGLOBAL_DTO);

  const [fieldsStatus, setFieldsStatus] = useState<FieldStatusType[]>([]);
  const [selectedRule, setSelectedRule] = useState<RuleType | undefined>(
    undefined,
  );
  const [rulesFilter, setRulesFilter] = useState<SelectTableFilterEnum>(
    SelectTableFilterEnum.Available,
  );
  const [teamglobalsFilter, setTeamglobalsFilter] =
    useState<SelectTableFilterEnum>(SelectTableFilterEnum.Available);

  const [ruleSelectValidationMessage, setRuleSelectValidationMessage] =
    useState<string>("");
  const [
    teamglobalsSelectValidationMessage,
    setTeamglobalsSelectValidationMessage,
  ] = useState<string>("");

  useEffect(() => {
    if (competitionglobalId) {
      const findAndSetCompetitionglobalReducer = async (
        competitionglobalId: string,
      ) => {
        await request<CompetitionglobalType>({
          method: MethodEnum.Get,
          url: URL_COMPETITIONGLOBAL_ID.replace(
            ":competitionglobalId",
            competitionglobalId,
          ),
          timeout: 1000,
        })
          .then(async (data) => {
            setCompetitionglobal(data);
            setLoadingCompetitionglobal(false);
          })
          .catch((error: AxiosError) => {
            const responseErrorMessage =
              (error.response?.data as string) || OTHER_MESSAGES.DEFAULT_ERROR;

            setNotification({
              message: responseErrorMessage,
              type: NotificationEnum.Error,
            });

            navigate(CompetitionglobalRoutesEnum.Competitionglobals);
          });
      };

      setIsUpdate(true);
      findAndSetCompetitionglobalReducer(competitionglobalId);
    } else {
      setIsUpdate(false);
      setCompetitionglobal(undefined);
      setLoadingCompetitionglobal(false);
    }
  }, [competitionglobalId]);

  useEffect(() => {
    if (competitionglobal) {
      setUpsertCompetitionglobal({
        name: competitionglobal.name,
        imageUrl: competitionglobal.imageUrl || "",
        season: competitionglobal.season,
        ruleId: competitionglobal.rule!.id,
        teamglobalIds: competitionglobal.competitionglobalTeamglobals!.map(
          (competitionglobalTeamglobal) =>
            competitionglobalTeamglobal.teamglobal!.id,
        ),
      });

      setSelectedRule(
        rules.find((rule) => rule.id === competitionglobal.rule!.id),
      );

      const fieldsToValidate: FieldValidationType[] = [
        {
          id: "imageUrl",
          value: competitionglobal.imageUrl || "",
        },
      ];

      fieldsToValidate.forEach((item) => {
        handleValidate(item);
      });
    } else {
      setUpsertCompetitionglobal(INITIAL_UPSERT_COMPETITIONGLOBAL_DTO);
      setFieldsStatus([]);
      setSelectedRule(undefined);
      setRulesFilter(SelectTableFilterEnum.Available);
      setTeamglobalsFilter(SelectTableFilterEnum.Available);
      setRuleSelectValidationMessage("");
      setTeamglobalsSelectValidationMessage("");
    }
  }, [competitionglobal]);

  useEffect(() => {
    if (
      upsertCompetitionglobal.name.length >= COMPETITIONGLOBAL.NAME.MIN &&
      upsertCompetitionglobal.name.length <= COMPETITIONGLOBAL.NAME.MAX &&
      upsertCompetitionglobal.season.length >= COMPETITIONGLOBAL.SEASON.MIN &&
      upsertCompetitionglobal.season.length <= COMPETITIONGLOBAL.SEASON.MAX &&
      isValidImage &&
      upsertCompetitionglobal.ruleId &&
      selectedRule &&
      upsertCompetitionglobal.teamglobalIds.length ===
        selectedRule.numberOfTeams
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [upsertCompetitionglobal, isValidImage, selectedRule]);

  const validateInputField = (
    id: string,
    value: string,
    input: HTMLInputElement,
  ) => {
    if (!["name", "season"].includes(id)) {
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
      if (value.length < COMPETITIONGLOBAL.NAME.MIN) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MIN_CHARACTER(
            COMPETITIONGLOBAL.NAME.MIN,
          ),
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: id, state: FieldStateEnum.Invalid },
        ]);
      } else if (value.length > COMPETITIONGLOBAL.NAME.MAX) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MAX_CHARACTER(
            COMPETITIONGLOBAL.NAME.MAX,
          ),
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: id, state: FieldStateEnum.Invalid },
        ]);
      } else {
        isValid();
      }
    } else if (id === "season") {
      if (value.length < COMPETITIONGLOBAL.SEASON.MIN) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MIN_CHARACTER(
            COMPETITIONGLOBAL.SEASON.MIN,
          ),
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: id, state: FieldStateEnum.Invalid },
        ]);
      } else if (value.length > COMPETITIONGLOBAL.SEASON.MAX) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MAX_CHARACTER(
            COMPETITIONGLOBAL.SEASON.MAX,
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
    if (id === "name") {
      const input = document.getElementById(id) as HTMLInputElement;

      if (!input) return;

      if (value.length < COMPETITIONGLOBAL.NAME.MIN) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MIN_CHARACTER(
            COMPETITIONGLOBAL.NAME.MIN,
          ),
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: "name", state: FieldStateEnum.Invalid },
        ]);
      } else if (value.length > COMPETITIONGLOBAL.NAME.MAX) {
        input.setCustomValidity(
          GENERAL_FIELD_VALIDATION_MESSAGES.MAX_CHARACTER(
            COMPETITIONGLOBAL.NAME.MAX,
          ),
        );
        setFieldsStatus((prev) => [
          ...prev,
          { id: "name", state: FieldStateEnum.Invalid },
        ]);
      } else {
        input.setCustomValidity("");
        setFieldsStatus((prev) => prev.filter((item) => item.id !== "name"));
      }
    } else if (id === "imageUrl") {
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
            { id: "imageUrl", state: FieldStateEnum.Invalid },
          ]);
        } else {
          input.setCustomValidity("");
          setFieldsStatus((prev) =>
            prev.filter((item) => item.id !== "imageUrl"),
          );
        }

        setIsValidImage(isValid);
      } else {
        input.setCustomValidity("");
        setFieldsStatus((prev) =>
          prev.filter((item) => item.id !== "imageUrl"),
        );

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

    setUpsertCompetitionglobal({
      ...upsertCompetitionglobal,
      [name]: value,
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
            { id: "imageUrl", state: FieldStateEnum.Invalid },
          ]);
        } else {
          input.setCustomValidity("");
          setFieldsStatus((prev) =>
            prev.filter((item) => item.id !== "imageUrl"),
          );
        }

        setIsValidImage(isValid);
      } else {
        input.setCustomValidity("");
        setFieldsStatus((prev) =>
          prev.filter((item) => item.id !== "imageUrl"),
        );
        setIsValidImage(true);
      }

      input.reportValidity();
    } else {
      validateInputField(name, value, input);
    }
  };

  const handleChangeRuleSelect = (value: string) => {
    const newValue = value ? value : undefined;

    const rule = newValue
      ? rules.find((rule) => rule.id === newValue)
      : undefined;

    setUpsertCompetitionglobal({
      ...upsertCompetitionglobal,
      ruleId: newValue,
      teamglobalIds: [],
      ...(rule && { name: rule.defaultCompetitionName }),
      ...(rule && { imageUrl: rule.defaultCompetitionImageUrl || "" }),
    });

    setSelectedRule(rule);

    if (!newValue) {
      setRuleSelectValidationMessage(
        GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED,
      );
      setFieldsStatus((prev) => [
        ...prev,
        { id: "ruleId", state: FieldStateEnum.Invalid },
      ]);
    } else {
      setRuleSelectValidationMessage("");
      setFieldsStatus((prev) => prev.filter((item) => item.id !== "ruleId"));

      const fieldsToValidate: FieldValidationType[] = [
        {
          id: "name",
          value: rule
            ? rule.defaultCompetitionName
            : upsertCompetitionglobal.name,
        },
        {
          id: "imageUrl",
          value: rule
            ? rule.defaultCompetitionImageUrl || ""
            : upsertCompetitionglobal.imageUrl,
        },
      ];

      fieldsToValidate.forEach((item) => {
        handleValidate(item);
      });
    }

    setTeamglobalsSelectValidationMessage("");
    setFieldsStatus((prev) =>
      prev.filter((item) => item.id !== "teamglobalIds"),
    );
  };

  const handleChangeTeamglobalsSelect = (values: string[]) => {
    setUpsertCompetitionglobal({
      ...upsertCompetitionglobal,
      teamglobalIds: values,
    });

    if (values.length === 0) {
      setTeamglobalsSelectValidationMessage(
        GENERAL_FIELD_VALIDATION_MESSAGES.REQUIRED_CHECKBOX,
      );
      setFieldsStatus((prev) => [
        ...prev,
        { id: "teamglobalIds", state: FieldStateEnum.Invalid },
      ]);
    } else if (selectedRule && values.length !== selectedRule.numberOfTeams) {
      setTeamglobalsSelectValidationMessage(
        COMPETITIONGLOBAL_MESSAGES.FIELD_VALIDATION.TEAMGLOBALS(
          selectedRule.numberOfTeams,
        ),
      );
      setFieldsStatus((prev) => [
        ...prev,
        { id: "teamglobalIds", state: FieldStateEnum.Invalid },
      ]);
    } else {
      setTeamglobalsSelectValidationMessage("");
      setFieldsStatus((prev) =>
        prev.filter((item) => item.id !== "teamglobalIds"),
      );
    }
  };

  const handleUpsertCompetitionglobal = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      ...upsertCompetitionglobal,
      imageUrl:
        upsertCompetitionglobal.imageUrl === ""
          ? null
          : upsertCompetitionglobal.imageUrl,
    };
    delete body.ruleId;

    if (competitionglobalId) {
      await request<CompetitionglobalType>({
        method: MethodEnum.Put,
        url: URL_COMPETITIONGLOBAL_ID.replace(
          ":competitionglobalId",
          competitionglobalId,
        ),
        body: body,
        timeout: 1000,
      })
        .then(async () => {
          await fetchCompetitionglobals();
          await fetchRules();
          await fetchTeamglobals();

          setNotification({
            message: COMPETITIONGLOBAL_MESSAGES.SUCCESS.UPDATE,
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
      await request<CompetitionglobalType>({
        method: MethodEnum.Post,
        url: URL_COMPETITIONGLOBAL,
        body: body,
        timeout: 1000,
      })
        .then(async () => {
          await fetchCompetitionglobals();
          await fetchRules();
          await fetchTeamglobals();

          setNotification({
            message: COMPETITIONGLOBAL_MESSAGES.SUCCESS.CREATE,
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

    navigate(CompetitionglobalRoutesEnum.Competitionglobals);
  };

  const handleReset = () => {
    setUpsertCompetitionglobal(INITIAL_UPSERT_COMPETITIONGLOBAL_DTO);
    setIsValidImage(true);
    setFieldsStatus([]);
    setSelectedRule(undefined);
    setRulesFilter(SelectTableFilterEnum.Available);
    setTeamglobalsFilter(SelectTableFilterEnum.Available);
    setRuleSelectValidationMessage("");
    setTeamglobalsSelectValidationMessage("");
  };

  const handleCancel = () => {
    navigate(CompetitionglobalRoutesEnum.Competitionglobals);
  };

  const handlePreventSubmitOnEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === KeyboardKeyEnum.Enter) {
      e.preventDefault();
    }
  };

  return {
    competitionglobal,
    upsertCompetitionglobal,
    loadingCompetitionglobal,
    loadingRequest,
    disabledButton,
    isUpdate,
    fieldsStatus,
    selectedRule,
    rulesFilter,
    teamglobalsFilter,
    ruleSelectValidationMessage,
    teamglobalsSelectValidationMessage,
    loadingRules,
    rules,
    loadingTeamglobals,
    teamglobals,
    handleSearchRules,
    handleSearchTeamglobals,
    setRulesFilter,
    setTeamglobalsFilter,
    handleChangeInput,
    handleChangeRuleSelect,
    handleChangeTeamglobalsSelect,
    handleUpsertCompetitionglobal,
    handleReset,
    handleCancel,
    handlePreventSubmitOnEnter,
  };
};
