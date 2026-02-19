import { SettingsglobalEntity } from "../entities/settingsglobal.entity";

export class ReturnSettingsglobalDto {
  id: string;
  seasonOffset: number;

  constructor(settingsglobalEntity: SettingsglobalEntity) {
    this.id = settingsglobalEntity.id;
    this.seasonOffset = settingsglobalEntity.seasonOffset;
  }
}
