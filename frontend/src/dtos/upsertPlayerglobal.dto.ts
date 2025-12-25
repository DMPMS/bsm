export interface UpsertPlayerglobalDto {
  name: string;
  imageUrl: string;
  birthdate: string;
  overall: number;

  countryId?: string;
  primaryPositionIds: string[];
  secondaryPositionIds: string[];
}
