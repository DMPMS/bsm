import { Request, Response } from "express";
import { PAGINATION } from "../config/constants";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { HttpError } from "../utils/httpError";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { plainToInstance } from "class-transformer";
import { validateDto } from "../utils/validateDto";
import { isUuid } from "../utils/uuid";
import { CompetitionglobalService } from "../services/competitionglobal.service";
import { ReturnCompetitionglobalDto } from "../dtos/returnCompetitionglobal.dto";
import { COMPETITIONGLOBAL_MESSAGES, DTO_MESSAGES } from "../utils/messages";
import { CreateCompetitionglobalDto } from "../dtos/createCompetitionglobal.dto";
import { UpdateCompetitionglobalDto } from "../dtos/updateCompetitionglobal.dto";

export class CompetitionglobalController {
  constructor(
    private readonly competitionglobalService: CompetitionglobalService
  ) {}

  async getCompetitionglobals(req: Request, res: Response): Promise<void> {
    try {
      const {
        page = PAGINATION.DEFAULT_PAGE,
        limit = PAGINATION.DEFAULT_LIMIT,
      } = req.query;

      const relationsOptions: RelationsOptionsType = {
        rule: { country: true },
      };

      const competitionglobals =
        await this.competitionglobalService.getCompetitionglobals(
          Number(page),
          Number(limit),
          relationsOptions
        );

      res
        .status(HttpStatusEnum.Ok)
        .json(
          competitionglobals.map(
            (competitionglobal) =>
              new ReturnCompetitionglobalDto(competitionglobal)
          )
        );
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(
            COMPETITIONGLOBAL_MESSAGES.ERROR.SELECT_COMPETITIONGLOBAL_ERROR
          );
      }
    }
  }

  async getCompetitionglobalById(req: Request, res: Response): Promise<void> {
    try {
      const { competitionglobalId } = req.params;

      if (!competitionglobalId || !isUuid(competitionglobalId)) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(
            COMPETITIONGLOBAL_MESSAGES.ERROR.COMPETITIONGLOBAL_ID_IS_INVALID
          );
        return;
      }

      const relationsOptions: RelationsOptionsType = {
        rule: { country: true },
        competitionglobalTeamglobals: {
          teamglobal: true,
        },
      };

      const competitionglobal =
        await this.competitionglobalService.getCompetitionglobalById(
          competitionglobalId,
          relationsOptions
        );

      res
        .status(HttpStatusEnum.Ok)
        .json(new ReturnCompetitionglobalDto(competitionglobal));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(
            COMPETITIONGLOBAL_MESSAGES.ERROR
              .SELECT_COMPETITIONGLOBAL_BY_ID_ERROR
          );
      }
    }
  }

  async createCompetitionglobal(req: Request, res: Response): Promise<void> {
    try {
      const createCompetitionglobalDto = plainToInstance(
        CreateCompetitionglobalDto,
        req.body,
        {
          excludeExtraneousValues: true,
        }
      );

      const isValid = await validateDto(createCompetitionglobalDto);
      if (!isValid) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(DTO_MESSAGES.ERROR.INVALID_DATA);
        return;
      }

      const savedCompetitionglobal =
        await this.competitionglobalService.createCompetitionglobal(
          createCompetitionglobalDto
        );

      res
        .status(HttpStatusEnum.Created)
        .json(new ReturnCompetitionglobalDto(savedCompetitionglobal));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(
            COMPETITIONGLOBAL_MESSAGES.ERROR.CREATE_COMPETITIONGLOBAL_ERROR
          );
      }
    }
  }

  async updateCompetitionglobal(req: Request, res: Response): Promise<void> {
    try {
      const updateCompetitionglobalDto = plainToInstance(
        UpdateCompetitionglobalDto,
        req.body,
        {
          excludeExtraneousValues: true,
        }
      );

      const { competitionglobalId } = req.params;

      const isValid = await validateDto(updateCompetitionglobalDto);
      if (!isValid) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(DTO_MESSAGES.ERROR.INVALID_DATA);
        return;
      }

      if (!competitionglobalId || !isUuid(competitionglobalId)) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(
            COMPETITIONGLOBAL_MESSAGES.ERROR.COMPETITIONGLOBAL_ID_IS_INVALID
          );
        return;
      }

      const updatedCompetitionglobal =
        await this.competitionglobalService.updateCompetitionglobal(
          updateCompetitionglobalDto,
          competitionglobalId
        );

      res
        .status(HttpStatusEnum.Ok)
        .json(new ReturnCompetitionglobalDto(updatedCompetitionglobal));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(
            COMPETITIONGLOBAL_MESSAGES.ERROR.UPDATE_COMPETITIONGLOBAL_ERROR
          );
      }
    }
  }

  async deleteCompetitionglobal(req: Request, res: Response): Promise<void> {
    try {
      const { competitionglobalId } = req.params;

      if (!competitionglobalId || !isUuid(competitionglobalId)) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(
            COMPETITIONGLOBAL_MESSAGES.ERROR.COMPETITIONGLOBAL_ID_IS_INVALID
          );
        return;
      }

      await this.competitionglobalService.deleteCompetitionglobal(
        competitionglobalId
      );

      res
        .status(HttpStatusEnum.Ok)
        .json(
          COMPETITIONGLOBAL_MESSAGES.SUCCESS
            .COMPETITIONGLOBAL_DELETED_SUCCESSFULLY
        );
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(
            COMPETITIONGLOBAL_MESSAGES.ERROR.DELETE_COMPETITIONGLOBAL_ERROR
          );
      }
    }
  }
}
