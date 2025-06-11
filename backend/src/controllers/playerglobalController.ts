import { Request, Response } from "express";
import { PAGINATION } from "../config/constants";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
import { HttpError } from "../utils/httpError";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../utils/messages";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { plainToInstance } from "class-transformer";
import { validateDto } from "../utils/validateDto";
import { PlayerglobalService } from "../services/playerglobalService";
import { CreatePlayerglobalDto } from "../dtos/createPlayerglobalDto";
import { UpdatePlayerglobalDto } from "../dtos/updatePlayerglobalDto";

export class PlayerglobalController {
  constructor(private readonly playerglobalService: PlayerglobalService) {}

  async getPlayerglobals(req: Request, res: Response): Promise<void> {
    try {
      const {
        page = PAGINATION.DEFAULT_PAGE,
        limit = PAGINATION.DEFAULT_LIMIT,
      } = req.query;

      const relationsOptions: RelationsOptionsType = {
        country: true,
      };

      const playerglobals = await this.playerglobalService.getPlayerglobals(
        Number(page),
        Number(limit),
        relationsOptions
      );

      res.status(HttpStatusEnum.Ok).json(playerglobals);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.PLAYERGLOBAL.SELECT_PLAYERGLOBAL_ERROR);
      }
    }
  }

  async getPlayerglobalById(req: Request, res: Response): Promise<void> {
    try {
      const { playerglobalId } = req.params;

      if (!playerglobalId) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.PLAYERGLOBAL.PLAYERGLOBAL_ID_IS_REQUIRED);
        return;
      }

      const relationsOptions: RelationsOptionsType = {
        country: true,
      };

      const playerglobal = await this.playerglobalService.getPlayerglobalById(
        playerglobalId,
        relationsOptions
      );

      res.status(HttpStatusEnum.Ok).json(playerglobal);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.PLAYERGLOBAL.SELECT_PLAYERGLOBAL_BY_ID_ERROR);
      }
    }
  }

  async createPlayerglobal(req: Request, res: Response): Promise<void> {
    try {
      const createPlayerglobalDto = plainToInstance(
        CreatePlayerglobalDto,
        req.body,
        {
          excludeExtraneousValues: true,
        }
      );

      const isValid = await validateDto(createPlayerglobalDto);
      if (!isValid) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.DTO.INVALID_DATA);
        return;
      }

      const savedPlayerglobal =
        await this.playerglobalService.createPlayerglobal(
          createPlayerglobalDto
        );

      res.status(HttpStatusEnum.Created).json(savedPlayerglobal);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.PLAYERGLOBAL.CREATE_PLAYERGLOBAL_ERROR);
      }
    }
  }

  async updatePlayerglobal(req: Request, res: Response): Promise<void> {
    try {
      const updatePlayerglobalDto = plainToInstance(
        UpdatePlayerglobalDto,
        req.body,
        {
          excludeExtraneousValues: true,
        }
      );

      const { playerglobalId } = req.params;

      const isValid = await validateDto(updatePlayerglobalDto);
      if (!isValid) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.DTO.INVALID_DATA);
        return;
      }

      if (!playerglobalId) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.PLAYERGLOBAL.PLAYERGLOBAL_ID_IS_REQUIRED);
        return;
      }

      const updatedPlayerglobal =
        await this.playerglobalService.updatePlayerglobal(
          updatePlayerglobalDto,
          playerglobalId
        );

      res.status(HttpStatusEnum.Ok).json(updatedPlayerglobal);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.PLAYERGLOBAL.UPDATE_PLAYERGLOBAL_ERROR);
      }
    }
  }

  async deletePlayerglobal(req: Request, res: Response): Promise<void> {
    try {
      const { playerglobalId } = req.params;

      if (!playerglobalId) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.PLAYERGLOBAL.PLAYERGLOBAL_ID_IS_REQUIRED);
        return;
      }

      await this.playerglobalService.deletePlayerglobal(playerglobalId);

      res
        .status(HttpStatusEnum.Ok)
        .json(SUCCESS_MESSAGES.PLAYERGLOBAL.PLAYERGLOBAL_DELETED_SUCCESSFULLY);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.PLAYERGLOBAL.DELETE_PLAYERGLOBAL_ERROR);
      }
    }
  }
}
