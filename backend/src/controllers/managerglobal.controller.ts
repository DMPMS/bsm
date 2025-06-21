import { Request, Response } from "express";
import { PAGINATION } from "../config/constants";
import { ManagerglobalService } from "../services/managerglobal.service";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { HttpError } from "../utils/httpError";
import { DTO_MESSAGES, MANAGERGLOBAL_MESSAGES } from "../utils/messages";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { plainToInstance } from "class-transformer";
import { CreateManagerglobalDto } from "../dtos/createManagerglobal.dto";
import { validateDto } from "../utils/validateDto";
import { UpdateManagerglobalDto } from "../dtos/updateManagerglobal.dto";
import { ReturnManagerglobalDto } from "../dtos/returnManagerglobal.dto";
import { isUuid } from "../utils/uuid";

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
          .json(MANAGERGLOBAL_MESSAGES.ERROR.SELECT_MANAGERGLOBAL_ERROR);
      }
    }
  }

  async getManagerglobalById(req: Request, res: Response): Promise<void> {
    try {
      const { managerglobalId } = req.params;

      if (!managerglobalId || !isUuid(managerglobalId)) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(MANAGERGLOBAL_MESSAGES.ERROR.MANAGERGLOBAL_ID_IS_INVALID);
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
          .json(MANAGERGLOBAL_MESSAGES.ERROR.SELECT_MANAGERGLOBAL_BY_ID_ERROR);
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
          .json(DTO_MESSAGES.ERROR.INVALID_DATA);
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
          .json(MANAGERGLOBAL_MESSAGES.ERROR.CREATE_MANAGERGLOBAL_ERROR);
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
          .json(DTO_MESSAGES.ERROR.INVALID_DATA);
        return;
      }

      if (!managerglobalId || !isUuid(managerglobalId)) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(MANAGERGLOBAL_MESSAGES.ERROR.MANAGERGLOBAL_ID_IS_INVALID);
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
          .json(MANAGERGLOBAL_MESSAGES.ERROR.UPDATE_MANAGERGLOBAL_ERROR);
      }
    }
  }

  async deleteManagerglobal(req: Request, res: Response): Promise<void> {
    try {
      const { managerglobalId } = req.params;

      if (!managerglobalId || !isUuid(managerglobalId)) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(MANAGERGLOBAL_MESSAGES.ERROR.MANAGERGLOBAL_ID_IS_INVALID);
        return;
      }

      await this.managerglobalService.deleteManagerglobal(managerglobalId);

      res
        .status(HttpStatusEnum.Ok)
        .json(
          MANAGERGLOBAL_MESSAGES.SUCCESS.MANAGERGLOBAL_DELETED_SUCCESSFULLY
        );
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(MANAGERGLOBAL_MESSAGES.ERROR.DELETE_MANAGERGLOBAL_ERROR);
      }
    }
  }
}
