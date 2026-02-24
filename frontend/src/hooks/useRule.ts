import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { useRuleReducer } from "../store/reducers/ruleReducer/useRuleReducer";
import { useRequest } from "../utils/request";
import { useEffect, useState } from "react";
import type { RuleType } from "../types/Rule.type";
import { MethodEnum } from "../enums/Method.enum";
import { URL_RULE } from "../config/urls";
import type { AxiosError } from "axios";
import { logout } from "../utils/auth";
import { defaultErrorNotification } from "../utils/defaultErrorNotification";

export const useRule = () => {
  const { setNotification } = useGlobalReducer();
  const { rules, setRules } = useRuleReducer();

  const { request } = useRequest();
  const navigate = useNavigate();

  const [loadingRules, setLoadingRules] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");

  const [modalDescription, setModalDescription] = useState<string | undefined>(
    undefined,
  );

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
        defaultErrorNotification(error, setNotification);

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

  const handleCloseModalDescription = () => {
    setModalDescription(undefined);
  };

  const handleOpenModalDescription = (description: string) => {
    setModalDescription(description);
  };

  return {
    loadingRules,
    rules,
    rulesFiltered,
    modalDescription,
    handleSearch,
    fetchRules,
    handleCloseModalDescription,
    handleOpenModalDescription,
  };
};
