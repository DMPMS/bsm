import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { useRuleReducer } from "../store/reducers/ruleReducer/useRuleReducer";
import { useRequest } from "../utils/request";
import { useEffect, useState } from "react";
import type { RuleType } from "../types/Rule.type";
import { MethodEnum } from "../enums/Method.enum";
import { URL_RULE } from "../config/urls";
import type { AxiosError } from "axios";
import { OTHER_MESSAGES } from "../utils/messages";
import { NotificationEnum } from "../enums/Notification.enum";
import { logout } from "../utils/auth";

export const useRule = () => {
  const { setNotification } = useGlobalReducer();
  const { rules, setRules } = useRuleReducer();

  const { request } = useRequest();
  const navigate = useNavigate();

  const [loadingRules, setLoadingRules] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");

  const rulesFiltered = rules.filter((rule) =>
    rule.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const fetchRules = async (timeout?: number) => {
    await request<RuleType[]>({
      method: MethodEnum.Get,
      url: URL_RULE,
      timeout: timeout,
    })
      .then((data) => {
        setRules(data);
        setLoadingRules(false);
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
    if (!rules || rules.length === 0) {
      fetchRules(1000);
    } else {
      setLoadingRules(false);
    }
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return {
    loadingRules,
    rules: rulesFiltered,
    handleSearch,
    fetchRules,
  };
};
