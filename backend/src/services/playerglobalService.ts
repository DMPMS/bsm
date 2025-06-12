import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../config/orm";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { PAGINATION } from "../config/constants";
import { HttpError } from "../utils/httpError";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
import { PLAYERGLOBAL_MESSAGES } from "../utils/messages";
import { CountryService } from "./countryService";
import { generateUuid } from "../utils/uuid";
import { PlayerglobalEntity } from "../entities/playerglobalEntity";
import { CreatePlayerglobalDto } from "../dtos/createPlayerglobalDto";
import { UpdatePlayerglobalDto } from "../dtos/updatePlayerglobalDto";
import { PositionService } from "./positionService";
import { PlayerglobalPositionService } from "./playerglobalPositionService";

export class PlayerglobalService {
  private readonly countryService: CountryService;
  private readonly positionService: PositionService;
  private _playerglobalPositionService?: PlayerglobalPositionService;

  constructor(
    private readonly playerglobalRepository: Repository<PlayerglobalEntity> = AppDataSource.getRepository(
      PlayerglobalEntity
    )
  ) {
    this.countryService = new CountryService();
    this.positionService = new PositionService();
  }

  private get playerglobalPositionService(): PlayerglobalPositionService {
    if (!this._playerglobalPositionService) {
      this._playerglobalPositionService = new PlayerglobalPositionService();
    }
    return this._playerglobalPositionService;
  }

  async getPlayerglobals(
    page: number,
    limit: number,
    relationsOptions?: RelationsOptionsType
  ): Promise<PlayerglobalEntity[]> {
    const skip = (page - PAGINATION.INITIAL_PAGE) * limit;

    const playerglobals = await this.playerglobalRepository.find({
      // skip,
      // take: limit,
      relations: relationsOptions,
      order: { createdAt: "DESC" },
    });

    return playerglobals;
  }

  async getPlayerglobalById(
    playerglobalId: string,
    relationsOptions?: RelationsOptionsType
  ): Promise<PlayerglobalEntity> {
    const playerglobal = await this.playerglobalRepository.findOne({
      where: { id: playerglobalId },
      relations: relationsOptions,
    });

    if (!playerglobal) {
      throw new HttpError(
        HttpStatusEnum.NotFound,
        PLAYERGLOBAL_MESSAGES.ERROR.PLAYERGLOBAL_ID_NOT_FOUND(playerglobalId)
      );
    }

    return playerglobal;
  }

  async createPlayerglobal(
    createPlayerglobalDto: CreatePlayerglobalDto
  ): Promise<PlayerglobalEntity> {
    const commonPositionIds = [
      ...createPlayerglobalDto.primaryPositionIds,
    ].filter((positionId) =>
      createPlayerglobalDto.secondaryPositionIds.includes(positionId)
    );

    if (commonPositionIds.length > 0) {
      throw new HttpError(
        HttpStatusEnum.UnprocessableEntity,
        PLAYERGLOBAL_MESSAGES.ERROR.COMMON_POSITION_IDS(commonPositionIds)
      );
    }

    await this.countryService.getCountryById(createPlayerglobalDto.countryId);

    await Promise.all([
      ...createPlayerglobalDto.primaryPositionIds.map((positionId) =>
        this.positionService.getPositionById(positionId)
      ),
      ...createPlayerglobalDto.secondaryPositionIds.map((positionId) =>
        this.positionService.getPositionById(positionId)
      ),
    ]);

    const savedPlayerglobal = await this.playerglobalRepository.save({
      ...createPlayerglobalDto,
      id: generateUuid(),
      imageUrl: createPlayerglobalDto.imageUrl
        ? createPlayerglobalDto.imageUrl
        : null,
    });

    await Promise.all([
      ...createPlayerglobalDto.primaryPositionIds.map((positionId) =>
        this.playerglobalPositionService.createPlayerglobalPosition({
          playerglobalId: savedPlayerglobal.id,
          positionId: positionId,
          isPrimary: true,
        })
      ),
      ...createPlayerglobalDto.secondaryPositionIds.map((positionId) =>
        this.playerglobalPositionService.createPlayerglobalPosition({
          playerglobalId: savedPlayerglobal.id,
          positionId: positionId,
          isPrimary: false,
        })
      ),
    ]);

    return savedPlayerglobal;
  }

  async updatePlayerglobal(
    updatePlayerglobalDto: UpdatePlayerglobalDto,
    playerglobalId: string
  ): Promise<PlayerglobalEntity> {
    const commonPositionIds = [
      ...updatePlayerglobalDto.primaryPositionIds,
    ].filter((positionId) =>
      updatePlayerglobalDto.secondaryPositionIds.includes(positionId)
    );

    if (commonPositionIds.length > 0) {
      throw new HttpError(
        HttpStatusEnum.UnprocessableEntity,
        PLAYERGLOBAL_MESSAGES.ERROR.COMMON_POSITION_IDS(commonPositionIds)
      );
    }

    const playerglobal = await this.getPlayerglobalById(playerglobalId);

    await this.countryService.getCountryById(updatePlayerglobalDto.countryId);

    await Promise.all([
      ...updatePlayerglobalDto.primaryPositionIds.map((positionId) =>
        this.positionService.getPositionById(positionId)
      ),
      ...updatePlayerglobalDto.secondaryPositionIds.map((positionId) =>
        this.positionService.getPositionById(positionId)
      ),
    ]);

    await this.playerglobalPositionService.deletePlayerglobalPosition(
      playerglobal.id
    );

    await Promise.all([
      ...updatePlayerglobalDto.primaryPositionIds.map((positionId) =>
        this.playerglobalPositionService.createPlayerglobalPosition({
          playerglobalId: playerglobal.id,
          positionId: positionId,
          isPrimary: true,
        })
      ),
      ...updatePlayerglobalDto.secondaryPositionIds.map((positionId) =>
        this.playerglobalPositionService.createPlayerglobalPosition({
          playerglobalId: playerglobal.id,
          positionId: positionId,
          isPrimary: false,
        })
      ),
    ]);

    const updatedPlayerglobal = await this.playerglobalRepository.save({
      ...playerglobal,
      ...updatePlayerglobalDto,
      imageUrl: updatePlayerglobalDto.imageUrl
        ? updatePlayerglobalDto.imageUrl
        : null,
    });

    return updatedPlayerglobal;
  }

  async deletePlayerglobal(playerglobalId: string): Promise<DeleteResult> {
    await this.getPlayerglobalById(playerglobalId);

    return this.playerglobalRepository.delete({ id: playerglobalId });
  }
}
