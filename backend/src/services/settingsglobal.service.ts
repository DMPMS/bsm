import { Repository } from "typeorm";
import { SettingsglobalEntity } from "../entities/settingsglobal.entity";
import { AppDataSource } from "../config/orm";
import { HttpError } from "../utils/httpError";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { SETTINGSGLOBAL_MESSAGES } from "../utils/messages";
import { UpdateSettingsglobalDto } from "../dtos/updateSettingsglobal.dto";

export class SettingsglobalService {
  constructor(
    private readonly settingsglobalRepository: Repository<SettingsglobalEntity> = AppDataSource.getRepository(
      SettingsglobalEntity,
    ),
  ) {}

  async getSettingsglobal(): Promise<SettingsglobalEntity> {
    const settingsglobal = await this.settingsglobalRepository.findOne({
      where: {},
    });

    if (!settingsglobal) {
      throw new HttpError(
        HttpStatusEnum.NotFound,
        SETTINGSGLOBAL_MESSAGES.ERROR.SELECT_SETTINGSGLOBAL_ERROR,
      );
    }

    return settingsglobal;
  }

  async updateSettingsglobal(
    updateSettingsglobalDto: UpdateSettingsglobalDto,
  ): Promise<SettingsglobalEntity> {
    const settingsglobal = await this.getSettingsglobal();

    const updatedSettingsglobal = await this.settingsglobalRepository.save({
      id: settingsglobal.id,
      seasonOffset: updateSettingsglobalDto.seasonOffset,
    });

    return updatedSettingsglobal;
  }
}
