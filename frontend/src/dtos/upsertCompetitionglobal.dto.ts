export interface UpsertCompetitionglobalDto {
  name: string;
  imageUrl: string;

  ruleId?: string;
  teamglobalIds: string[];
}
