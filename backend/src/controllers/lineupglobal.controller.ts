import { Request, Response } from "express";
import { LineupglobalService } from "../services/lineupglobal.service";
import { isUuid } from "../utils/uuid";
import {
  DTO_MESSAGES,
  LINEUPGLOBAL_MESSAGES,
  TEAMGLOBAL_MESSAGES,
} from "../utils/messages";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { ReturnLineupglobalDto } from "../dtos/returnLineupglobal.dto";
import { HttpError } from "../utils/httpError";
import { plainToInstance } from "class-transformer";
import { UpdateLineupglobalDto } from "../dtos/updateLineupglobal.dto";
import { validateDto } from "../utils/validateDto";
import { RelationsOptionsType } from "../types/RelationsOptions.type";

export class LineupglobalController {
  constructor(private readonly lineupglobalService: LineupglobalService) {}

  async getLineupglobalsByTeamglobalId(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const { teamglobalId } = req.params;

      if (!teamglobalId || !isUuid(teamglobalId)) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(TEAMGLOBAL_MESSAGES.ERROR.TEAMGLOBAL_ID_IS_INVALID);
        return;
      }

      const lineupglobals =
        await this.lineupglobalService.getLineupglobalsByTeamglobalId(
          teamglobalId,
        );

      res
        .status(HttpStatusEnum.Ok)
        .json(
          lineupglobals.map(
            (lineupglobal) => new ReturnLineupglobalDto(lineupglobal),
          ),
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
          .json(LINEUPGLOBAL_MESSAGES.ERROR.SELECT_LINEUPGLOBAL_ERROR);
      }
    }
  }

  async getLineupglobalById(req: Request, res: Response): Promise<void> {
    try {
      const { lineupglobalId } = req.params;

      if (!lineupglobalId || !isUuid(lineupglobalId)) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(LINEUPGLOBAL_MESSAGES.ERROR.LINEUPGLOBAL_ID_IS_INVALID);
        return;
      }

      const relationsOptions: RelationsOptionsType = {
        lineupglobalPlayerglobals: true,
      };

      const lineupglobal = await this.lineupglobalService.getLineupglobalById(
        lineupglobalId,
        relationsOptions,
      );

      res
        .status(HttpStatusEnum.Ok)
        .json(new ReturnLineupglobalDto(lineupglobal));
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
          .json(LINEUPGLOBAL_MESSAGES.ERROR.SELECT_LINEUPGLOBAL_BY_ID_ERROR);
      }
    }
  }

  async updateLineupglobal(req: Request, res: Response): Promise<void> {
    try {
      const updateLineupglobalDto = plainToInstance(
        UpdateLineupglobalDto,
        req.body,
        {
          excludeExtraneousValues: true,
        },
      );

      const { lineupglobalId } = req.params;

      const isValid = await validateDto(updateLineupglobalDto);
      if (!isValid) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(DTO_MESSAGES.ERROR.INVALID_DATA);
        return;
      }

      if (!lineupglobalId || !isUuid(lineupglobalId)) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(LINEUPGLOBAL_MESSAGES.ERROR.LINEUPGLOBAL_ID_IS_INVALID);
        return;
      }

      const updatedLineupglobal =
        await this.lineupglobalService.updateLineupglobal(
          updateLineupglobalDto,
          lineupglobalId,
        );

      res
        .status(HttpStatusEnum.Ok)
        .json(new ReturnLineupglobalDto(updatedLineupglobal));
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
          .json(LINEUPGLOBAL_MESSAGES.ERROR.UPDATE_LINEUPGLOBAL_ERROR);
      }
    }
  }
}
