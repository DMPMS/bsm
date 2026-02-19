import { Request, Response } from "express";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { SettingsglobalService } from "../services/settingsglobal.service";
import { HttpError } from "../utils/httpError";
import { SETTINGSGLOBAL_MESSAGES, DTO_MESSAGES } from "../utils/messages";
import { plainToInstance } from "class-transformer";
import { UpdateSettingsglobalDto } from "../dtos/updateSettingsglobal.dto";
import { validateDto } from "../utils/validateDto";
import { ReturnSettingsglobalDto } from "../dtos/returnSettingsglobal.dto";

export class SettingsglobalController {
  constructor(private readonly settingsglobalService: SettingsglobalService) {}

  async getSettingsglobal(res: Response): Promise<void> {
    try {
      const settingsglobal =
        await this.settingsglobalService.getSettingsglobal();

      res
        .status(HttpStatusEnum.Ok)
        .json(new ReturnSettingsglobalDto(settingsglobal));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }

        res
          .status(HttpStatusEnum.InternalServerError)
          .json(SETTINGSGLOBAL_MESSAGES.ERROR.SELECT_SETTINGSGLOBAL_ERROR);
      }
    }
  }

  async updateSettingsglobal(req: Request, res: Response): Promise<void> {
    try {
      const updateSettingsglobalDto = plainToInstance(
        UpdateSettingsglobalDto,
        req.body,
        {
          excludeExtraneousValues: true,
        },
      );

      const isValid = await validateDto(updateSettingsglobalDto);
      if (!isValid) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(DTO_MESSAGES.ERROR.INVALID_DATA);
        return;
      }

      const updatedSettingsglobal =
        await this.settingsglobalService.updateSettingsglobal(
          updateSettingsglobalDto,
        );

      res
        .status(HttpStatusEnum.Ok)
        .json(new ReturnSettingsglobalDto(updatedSettingsglobal));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }

        res
          .status(HttpStatusEnum.InternalServerError)
          .json(SETTINGSGLOBAL_MESSAGES.ERROR.UPDATE_SETTINGSGLOBAL_ERROR);
      }
    }
  }
}
