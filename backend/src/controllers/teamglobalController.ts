import { Request, Response } from "express";
import { PAGINATION } from "../config/constants";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
import { HttpError } from "../utils/httpError";
import { DTO_MESSAGES, TEAMGLOBAL_MESSAGES } from "../utils/messages";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { plainToInstance } from "class-transformer";
import { validateDto } from "../utils/validateDto";
import { TeamglobalService } from "../services/teamglobalService";
import { CreateTeamglobalDto } from "../dtos/createTeamglobalDto";
import { UpdateTeamglobalDto } from "../dtos/updateTeamglobalDto";
import { ReturnTeamglobalDto } from "../dtos/returnTeamglobalDto";
import { isUuid } from "../utils/uuid";

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

      res
        .status(HttpStatusEnum.Ok)
        .json(
          teamglobals.map((teamglobal) => new ReturnTeamglobalDto(teamglobal))
        );
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(TEAMGLOBAL_MESSAGES.ERROR.SELECT_TEAMGLOBAL_ERROR);
      }
    }
  }

  async getTeamglobalById(req: Request, res: Response): Promise<void> {
    try {
      const { teamglobalId } = req.params;

      if (!teamglobalId || !isUuid(teamglobalId)) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(TEAMGLOBAL_MESSAGES.ERROR.TEAMGLOBAL_ID_IS_INVALID);
        return;
      }

      const relationsOptions: RelationsOptionsType = {
        country: true,
        managerglobal: true,
        playerglobals: true,
      };

      const teamglobal = await this.teamglobalService.getTeamglobalById(
        teamglobalId,
        relationsOptions
      );

      res.status(HttpStatusEnum.Ok).json(new ReturnTeamglobalDto(teamglobal));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(TEAMGLOBAL_MESSAGES.ERROR.SELECT_TEAMGLOBAL_BY_ID_ERROR);
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
          .json(DTO_MESSAGES.ERROR.INVALID_DATA);
        return;
      }

      const savedTeamglobal = await this.teamglobalService.createTeamglobal(
        createTeamglobalDto
      );

      res
        .status(HttpStatusEnum.Created)
        .json(new ReturnTeamglobalDto(savedTeamglobal));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(TEAMGLOBAL_MESSAGES.ERROR.CREATE_TEAMGLOBAL_ERROR);
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
          .json(DTO_MESSAGES.ERROR.INVALID_DATA);
        return;
      }

      if (!teamglobalId || !isUuid(teamglobalId)) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(TEAMGLOBAL_MESSAGES.ERROR.TEAMGLOBAL_ID_IS_INVALID);
        return;
      }

      const updatedTeamglobal = await this.teamglobalService.updateTeamglobal(
        updateTeamglobalDto,
        teamglobalId
      );

      res
        .status(HttpStatusEnum.Ok)
        .json(new ReturnTeamglobalDto(updatedTeamglobal));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(TEAMGLOBAL_MESSAGES.ERROR.UPDATE_TEAMGLOBAL_ERROR);
      }
    }
  }

  async deleteTeamglobal(req: Request, res: Response): Promise<void> {
    try {
      const { teamglobalId } = req.params;

      if (!teamglobalId || !isUuid(teamglobalId)) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(TEAMGLOBAL_MESSAGES.ERROR.TEAMGLOBAL_ID_IS_INVALID);
        return;
      }

      await this.teamglobalService.deleteTeamglobal(teamglobalId);

      res
        .status(HttpStatusEnum.Ok)
        .json(TEAMGLOBAL_MESSAGES.SUCCESS.TEAMGLOBAL_DELETED_SUCCESSFULLY);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(TEAMGLOBAL_MESSAGES.ERROR.DELETE_TEAMGLOBAL_ERROR);
      }
    }
  }
}
