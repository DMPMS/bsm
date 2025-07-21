import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { setCountriesAction } from ".";
import type { CountryType } from "../../../types/Country.type";

export const useCountryReducer = () => {
  const dispatch = useDispatch();
  const { countries } = useAppSelector((state) => state.countryReducer);

  const setCountries = (countries: CountryType[]) => {
    dispatch(setCountriesAction(countries));
  };

  return {
    countries,
    setCountries,
  };
};
