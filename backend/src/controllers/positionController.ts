import { Request, Response } from "express";
import { PositionService } from "../services/positionService";
import { PAGINATION } from "../config/constants";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
import { HttpError } from "../utils/httpError";
import { POSITION_MESSAGES } from "../utils/messages";
import { ReturnPositionDto } from "../dtos/returnPositionDto";

export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  async getPositions(req: Request, res: Response): Promise<void> {
    try {
      const {
        page = PAGINATION.DEFAULT_PAGE,
        limit = PAGINATION.DEFAULT_LIMIT,
      } = req.query;

      const positions = await this.positionService.getPositions(
        Number(page),
        Number(limit)
      );

      res
        .status(HttpStatusEnum.Ok)
        .json(positions.map((position) => new ReturnPositionDto(position)));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(POSITION_MESSAGES.ERROR.SELECT_POSITION_ERROR);
      }
    }
  }
}
