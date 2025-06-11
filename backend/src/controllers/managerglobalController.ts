import { Request, Response } from "express";
import { PAGINATION } from "../config/constants";
import { ManagerglobalService } from "../services/managerglobalService";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
import { HttpError } from "../utils/httpError";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../utils/messages";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { plainToInstance } from "class-transformer";
import { CreateManagerglobalDto } from "../dtos/createManagerglobalDto";
import { validateDto } from "../utils/validateDto";
import { UpdateManagerglobalDto } from "../dtos/updateManagerglobalDto";
import { ReturnManagerglobalDto } from "../dtos/returnManagerglobalDto";

export class ManagerglobalController {
  constructor(private readonly managerglobalService: ManagerglobalService) {}

  async getManagerglobals(req: Request, res: Response): Promise<void> {
    try {
      const {
        page = PAGINATION.DEFAULT_PAGE,
        limit = PAGINATION.DEFAULT_LIMIT,
      } = req.query;

      const relationsOptions: RelationsOptionsType = {
        country: true,
        teamglobal: true,
      };

      const managerglobals = await this.managerglobalService.getManagerglobals(
        Number(page),
        Number(limit),
        relationsOptions
      );

      res
        .status(HttpStatusEnum.Ok)
        .json(
          managerglobals.map(
            (managerglobal) => new ReturnManagerglobalDto(managerglobal)
          )
        );
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.MANAGERGLOBAL.SELECT_MANAGERGLOBAL_ERROR);
      }
    }
  }

  async getManagerglobalById(req: Request, res: Response): Promise<void> {
    try {
      const { managerglobalId } = req.params;

      if (!managerglobalId) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.MANAGERGLOBAL.MANAGERGLOBAL_ID_IS_REQUIRED);
        return;
      }

      const relationsOptions: RelationsOptionsType = {
        country: true,
      };

      const managerglobal =
        await this.managerglobalService.getManagerglobalById(
          managerglobalId,
          relationsOptions
        );

      res
        .status(HttpStatusEnum.Ok)
        .json(new ReturnManagerglobalDto(managerglobal));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.MANAGERGLOBAL.SELECT_MANAGERGLOBAL_BY_ID_ERROR);
      }
    }
  }

  async createManagerglobal(req: Request, res: Response): Promise<void> {
    try {
      const createManagerglobalDto = plainToInstance(
        CreateManagerglobalDto,
        req.body,
        {
          excludeExtraneousValues: true,
        }
      );

      const isValid = await validateDto(createManagerglobalDto);
      if (!isValid) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.DTO.INVALID_DATA);
        return;
      }

      const savedManagerglobal =
        await this.managerglobalService.createManagerglobal(
          createManagerglobalDto
        );

      res
        .status(HttpStatusEnum.Created)
        .json(new ReturnManagerglobalDto(savedManagerglobal));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.MANAGERGLOBAL.CREATE_MANAGERGLOBAL_ERROR);
      }
    }
  }

  async updateManagerglobal(req: Request, res: Response): Promise<void> {
    try {
      const updateManagerglobalDto = plainToInstance(
        UpdateManagerglobalDto,
        req.body,
        {
          excludeExtraneousValues: true,
        }
      );

      const { managerglobalId } = req.params;

      const isValid = await validateDto(updateManagerglobalDto);
      if (!isValid) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.DTO.INVALID_DATA);
        return;
      }

      if (!managerglobalId) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.MANAGERGLOBAL.MANAGERGLOBAL_ID_IS_REQUIRED);
        return;
      }

      const updatedManagerglobal =
        await this.managerglobalService.updateManagerglobal(
          updateManagerglobalDto,
          managerglobalId
        );

      res
        .status(HttpStatusEnum.Ok)
        .json(new ReturnManagerglobalDto(updatedManagerglobal));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.MANAGERGLOBAL.UPDATE_MANAGERGLOBAL_ERROR);
      }
    }
  }

  async deleteManagerglobal(req: Request, res: Response): Promise<void> {
    try {
      const { managerglobalId } = req.params;

      if (!managerglobalId) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.MANAGERGLOBAL.MANAGERGLOBAL_ID_IS_REQUIRED);
        return;
      }

      await this.managerglobalService.deleteManagerglobal(managerglobalId);

      res
        .status(HttpStatusEnum.Ok)
        .json(
          SUCCESS_MESSAGES.MANAGERGLOBAL.MANAGERGLOBAL_DELETED_SUCCESSFULLY
        );
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.MANAGERGLOBAL.DELETE_MANAGERGLOBAL_ERROR);
      }
    }
  }
}
