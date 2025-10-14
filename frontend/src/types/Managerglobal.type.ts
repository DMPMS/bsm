import type { CountryType } from "./Country.type";
import type { TeamglobalType } from "./Teamglobal.type";

export interface ManagerglobalType {
  id: string;
  name: string;
  imageUrl: string | null;
  birthdate: string;

  country?: CountryType;
  teamglobal?: TeamglobalType;
}
