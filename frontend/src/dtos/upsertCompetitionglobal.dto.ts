export interface UpsertCompetitionglobalDto {
  name: string;
  imageUrl: string;
  season: string;

  ruleId?: string;
  teamglobalIds: string[];
}
