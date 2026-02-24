import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store/reducers/globalReducer/useGlobalReducer";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useCountryReducer } from "../store/reducers/countryReducer/useCountryReducer";
import { useRequest } from "../utils/request";
import { URL_COUNTRY } from "../config/urls";
import type { CountryType } from "../types/Country.type";
import { MethodEnum } from "../enums/Method.enum";
import { logout } from "../utils/auth";
import { defaultErrorNotification } from "../utils/defaultErrorNotification";

export const useCountry = () => {
  const { setNotification } = useGlobalReducer();
  const { countries, setCountries } = useCountryReducer();

  const { request } = useRequest();
  const navigate = useNavigate();

  const [loadingCountries, setLoadingCountries] = useState<boolean>(true);

  const fetchCountries = async (timeout?: number) => {
    await request<CountryType[]>({
      method: MethodEnum.Get,
      url: URL_COUNTRY,
      timeout: timeout,
    })
      .then((data) => {
        setCountries(data);
        setLoadingCountries(false);
      })
      .catch((error: AxiosError) => {
        defaultErrorNotification(error, setNotification);

        logout(navigate);
      });
  };

  useEffect(() => {
    if (!countries || countries.length === 0) {
      fetchCountries(1000);
    } else {
      setLoadingCountries(false);
    }
  }, []);

  return {
    loadingCountries,
    countries,
  };
};
