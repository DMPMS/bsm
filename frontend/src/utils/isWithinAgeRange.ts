import { CURRENT_DATE } from "../config/constants";

export const isWithinAgeRange = (
  birthdate: string,
  minAge: number,
  maxAge: number,
): boolean => {
  const [year, month, day] = birthdate.split("-").map(Number);
  const ajustedBirthdate = new Date(year, month - 1, day);

  const minBirthDate = new Date(
    CURRENT_DATE.getFullYear() - maxAge,
    CURRENT_DATE.getMonth(),
    CURRENT_DATE.getDate(),
  );

  const maxBirthDate = new Date(
    CURRENT_DATE.getFullYear() - minAge,
    CURRENT_DATE.getMonth(),
    CURRENT_DATE.getDate(),
  );

  return ajustedBirthdate >= minBirthDate && ajustedBirthdate <= maxBirthDate;
};
