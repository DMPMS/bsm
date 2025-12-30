export interface UpsertTeamglobalDto {
  name: string;
  abbreviation: string;
  imageUrl: string;

  countryId?: string;
  managerglobalId?: string;
  playerglobalIds: string[];
}
