import { Repository } from "typeorm";
import { PositionEntity } from "../entities/position.entity";
import { AppDataSource } from "../config/orm";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { PAGINATION } from "../config/constants";
import { HttpError } from "../utils/httpError";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { POSITION_MESSAGES } from "../utils/messages";

export class PositionService {
  constructor(
    private readonly positionRepository: Repository<PositionEntity> = AppDataSource.getRepository(
      PositionEntity
    )
  ) {}

  async getPositions(
    page: number,
    limit: number,
    relationsOptions?: RelationsOptionsType
  ): Promise<PositionEntity[]> {
    const skip = (page - PAGINATION.INITIAL_PAGE) * limit;

    const positions = await this.positionRepository.find({
      // skip,
      // take: limit,
      relations: relationsOptions,
      order: { code: "ASC" },
    });

    return positions;
  }

  async getPositionById(
    positionId: string,
    relationsOptions?: RelationsOptionsType
  ): Promise<PositionEntity> {
    const position = await this.positionRepository.findOne({
      where: { id: positionId },
      relations: relationsOptions,
    });

    if (!position) {
      throw new HttpError(
        HttpStatusEnum.NotFound,
        POSITION_MESSAGES.ERROR.POSITION_ID_NOT_FOUND(positionId)
      );
    }

    return position;
  }
}
