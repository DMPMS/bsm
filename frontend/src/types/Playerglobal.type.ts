import type { CountryType } from "./Country.type";
import type { PlayerglobalPositionType } from "./PlayerglobalPosition.type";
import type { TeamglobalType } from "./Teamglobal.type";

export interface PlayerglobalType {
  id: string;
  name: string;
  imageUrl: string | null;
  birthdate: string;
  overall: number;

  country?: CountryType;
  playerglobalPositions?: PlayerglobalPositionType[];
  teamglobal?: TeamglobalType;
}
