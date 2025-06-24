import { Request, Response } from "express";
import { PAGINATION } from "../config/constants";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { HttpError } from "../utils/httpError";
import { DTO_MESSAGES, PLAYERGLOBAL_MESSAGES } from "../utils/messages";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { plainToInstance } from "class-transformer";
import { validateDto } from "../utils/validateDto";
import { PlayerglobalService } from "../services/playerglobal.service";
import { CreatePlayerglobalDto } from "../dtos/createPlayerglobal.dto";
import { UpdatePlayerglobalDto } from "../dtos/updatePlayerglobal.dto";
import { ReturnPlayerglobalDto } from "../dtos/returnPlayerglobal.dto";
import { isUuid } from "../utils/uuid";

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
        teamglobal: true,
        playerglobalPositions: {
          position: true,
        },
      };

      const playerglobals = await this.playerglobalService.getPlayerglobals(
        Number(page),
        Number(limit),
        relationsOptions
      );

      res
        .status(HttpStatusEnum.Ok)
        .json(
          playerglobals.map(
            (playerglobal) => new ReturnPlayerglobalDto(playerglobal)
          )
        );
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
          .json(PLAYERGLOBAL_MESSAGES.ERROR.SELECT_PLAYERGLOBAL_ERROR);
      }
    }
  }

  async getPlayerglobalById(req: Request, res: Response): Promise<void> {
    try {
      const { playerglobalId } = req.params;

      if (!playerglobalId || !isUuid(playerglobalId)) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(PLAYERGLOBAL_MESSAGES.ERROR.PLAYERGLOBAL_ID_IS_INVALID);
        return;
      }

      const relationsOptions: RelationsOptionsType = {
        country: true,
        playerglobalPositions: {
          position: true,
        },
      };

      const playerglobal = await this.playerglobalService.getPlayerglobalById(
        playerglobalId,
        relationsOptions
      );

      res
        .status(HttpStatusEnum.Ok)
        .json(new ReturnPlayerglobalDto(playerglobal));
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
          .json(PLAYERGLOBAL_MESSAGES.ERROR.SELECT_PLAYERGLOBAL_BY_ID_ERROR);
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
          .json(DTO_MESSAGES.ERROR.INVALID_DATA);
        return;
      }

      const savedPlayerglobal =
        await this.playerglobalService.createPlayerglobal(
          createPlayerglobalDto
        );

      res
        .status(HttpStatusEnum.Created)
        .json(new ReturnPlayerglobalDto(savedPlayerglobal));
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
          .json(PLAYERGLOBAL_MESSAGES.ERROR.CREATE_PLAYERGLOBAL_ERROR);
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
          .json(DTO_MESSAGES.ERROR.INVALID_DATA);
        return;
      }

      if (!playerglobalId || !isUuid(playerglobalId)) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(PLAYERGLOBAL_MESSAGES.ERROR.PLAYERGLOBAL_ID_IS_INVALID);
        return;
      }

      const updatedPlayerglobal =
        await this.playerglobalService.updatePlayerglobal(
          updatePlayerglobalDto,
          playerglobalId
        );

      res
        .status(HttpStatusEnum.Ok)
        .json(new ReturnPlayerglobalDto(updatedPlayerglobal));
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
          .json(PLAYERGLOBAL_MESSAGES.ERROR.UPDATE_PLAYERGLOBAL_ERROR);
      }
    }
  }

  async deletePlayerglobal(req: Request, res: Response): Promise<void> {
    try {
      const { playerglobalId } = req.params;

      if (!playerglobalId || !isUuid(playerglobalId)) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(PLAYERGLOBAL_MESSAGES.ERROR.PLAYERGLOBAL_ID_IS_INVALID);
        return;
      }

      await this.playerglobalService.deletePlayerglobal(playerglobalId);

      res
        .status(HttpStatusEnum.Ok)
        .json(PLAYERGLOBAL_MESSAGES.SUCCESS.PLAYERGLOBAL_DELETED_SUCCESSFULLY);
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
          .json(PLAYERGLOBAL_MESSAGES.ERROR.DELETE_PLAYERGLOBAL_ERROR);
      }
    }
  }
}
