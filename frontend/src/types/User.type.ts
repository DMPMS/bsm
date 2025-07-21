import type { CountryType } from "./Country.type";

export interface UserType {
  id: number;
  name: string;
  imageUrl: string | null;
  birthdate: string;
  email: string;

  country?: CountryType;
}
