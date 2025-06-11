import { Request, Response } from "express";
import { PAGINATION } from "../config/constants";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
import { HttpError } from "../utils/httpError";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../utils/messages";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { plainToInstance } from "class-transformer";
import { validateDto } from "../utils/validateDto";
import { TeamglobalService } from "../services/teamglobalService";
import { CreateTeamglobalDto } from "../dtos/createTeamglobalDto";
import { UpdateTeamglobalDto } from "../dtos/updateTeamglobalDto";

export class TeamglobalController {
  constructor(private readonly teamglobalService: TeamglobalService) {}

  async getTeamglobals(req: Request, res: Response): Promise<void> {
    try {
      const {
        page = PAGINATION.DEFAULT_PAGE,
        limit = PAGINATION.DEFAULT_LIMIT,
      } = req.query;

      const relationsOptions: RelationsOptionsType = {
        country: true,
        managerglobal: true,
      };

      const teamglobals = await this.teamglobalService.getTeamglobals(
        Number(page),
        Number(limit),
        relationsOptions
      );

      res.status(HttpStatusEnum.Ok).json(teamglobals);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.TEAMGLOBAL.SELECT_TEAMGLOBAL_ERROR);
      }
    }
  }

  async getTeamglobalById(req: Request, res: Response): Promise<void> {
    try {
      const { teamglobalId } = req.params;

      if (!teamglobalId) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.TEAMGLOBAL.TEAMGLOBAL_ID_IS_REQUIRED);
        return;
      }

      const relationsOptions: RelationsOptionsType = {
        country: true,
        managerglobal: true,
      };

      const teamglobal = await this.teamglobalService.getTeamglobalById(
        teamglobalId,
        relationsOptions
      );

      res.status(HttpStatusEnum.Ok).json(teamglobal);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.TEAMGLOBAL.SELECT_TEAMGLOBAL_BY_ID_ERROR);
      }
    }
  }

  async createTeamglobal(req: Request, res: Response): Promise<void> {
    try {
      const createTeamglobalDto = plainToInstance(
        CreateTeamglobalDto,
        req.body,
        {
          excludeExtraneousValues: true,
        }
      );

      const isValid = await validateDto(createTeamglobalDto);
      if (!isValid) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.DTO.INVALID_DATA);
        return;
      }

      const savedTeamglobal = await this.teamglobalService.createTeamglobal(
        createTeamglobalDto
      );

      res.status(HttpStatusEnum.Created).json(savedTeamglobal);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.TEAMGLOBAL.CREATE_TEAMGLOBAL_ERROR);
      }
    }
  }

  async updateTeamglobal(req: Request, res: Response): Promise<void> {
    try {
      const updateTeamglobalDto = plainToInstance(
        UpdateTeamglobalDto,
        req.body,
        {
          excludeExtraneousValues: true,
        }
      );

      const { teamglobalId } = req.params;

      const isValid = await validateDto(updateTeamglobalDto);
      if (!isValid) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.DTO.INVALID_DATA);
        return;
      }

      if (!teamglobalId) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.TEAMGLOBAL.TEAMGLOBAL_ID_IS_REQUIRED);
        return;
      }

      const updatedTeamglobal = await this.teamglobalService.updateTeamglobal(
        updateTeamglobalDto,
        teamglobalId
      );

      res.status(HttpStatusEnum.Ok).json(updatedTeamglobal);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.TEAMGLOBAL.UPDATE_TEAMGLOBAL_ERROR);
      }
    }
  }

  async deleteTeamglobal(req: Request, res: Response): Promise<void> {
    try {
      const { teamglobalId } = req.params;

      if (!teamglobalId) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.TEAMGLOBAL.TEAMGLOBAL_ID_IS_REQUIRED);
        return;
      }

      await this.teamglobalService.deleteTeamglobal(teamglobalId);

      res
        .status(HttpStatusEnum.Ok)
        .json(SUCCESS_MESSAGES.TEAMGLOBAL.TEAMGLOBAL_DELETED_SUCCESSFULLY);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.TEAMGLOBAL.DELETE_TEAMGLOBAL_ERROR);
      }
    }
  }
}
