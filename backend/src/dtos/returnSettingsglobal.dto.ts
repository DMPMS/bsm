import { SettingsglobalEntity } from "../entities/settingsglobal.entity";
import { SeasonOffsetEnum } from "../enums/SeasonOffset.enum";

export class ReturnSettingsglobalDto {
  id: string;
  seasonOffset: SeasonOffsetEnum;

  constructor(settingsglobalEntity: SettingsglobalEntity) {
    this.id = settingsglobalEntity.id;
    this.seasonOffset = settingsglobalEntity.seasonOffset;
  }
}
