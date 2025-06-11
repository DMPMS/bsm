import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../config/orm";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { PAGINATION } from "../config/constants";
import { HttpError } from "../utils/httpError";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
import { ERROR_MESSAGES } from "../utils/messages";
import { CountryService } from "./countryService";
import { generateUuid } from "../utils/generateUuid";
import { PlayerglobalEntity } from "../entities/playerglobalEntity";
import { ReturnPlayerglobalDto } from "../dtos/returnPlayerglobalDto";
import { CreatePlayerglobalDto } from "../dtos/createPlayerglobalDto";
import { UpdatePlayerglobalDto } from "../dtos/updatePlayerglobalDto";

export class PlayerglobalService {
  private readonly countryService: CountryService;

  constructor(
    private readonly playerglobalRepository: Repository<PlayerglobalEntity> = AppDataSource.getRepository(
      PlayerglobalEntity
    )
  ) {
    this.countryService = new CountryService();
  }

  async getPlayerglobals(
    page: number,
    limit: number,
    relationsOptions?: RelationsOptionsType
  ): Promise<ReturnPlayerglobalDto[]> {
    const skip = (page - PAGINATION.INITIAL_PAGE) * limit;

    const playerglobals = await this.playerglobalRepository.find({
      // skip,
      // take: limit,
      relations: relationsOptions,
      order: { createdAt: "DESC" },
    });

    return playerglobals.map(
      (playerglobal) => new ReturnPlayerglobalDto(playerglobal)
    );
  }

  async getPlayerglobalById(
    playerglobalId: string,
    relationsOptions?: RelationsOptionsType
  ): Promise<ReturnPlayerglobalDto> {
    const playerglobal = await this.playerglobalRepository.findOne({
      where: { id: playerglobalId },
      relations: relationsOptions,
    });

    if (!playerglobal) {
      throw new HttpError(
        HttpStatusEnum.NotFound,
        ERROR_MESSAGES.PLAYERGLOBAL.PLAYERGLOBAL_ID_NOT_FOUND(playerglobalId)
      );
    }

    return new ReturnPlayerglobalDto(playerglobal);
  }

  async createPlayerglobal(
    createPlayerglobalDto: CreatePlayerglobalDto
  ): Promise<ReturnPlayerglobalDto> {
    await this.countryService.getCountryById(createPlayerglobalDto.countryId);

    const savedPlayerglobal = await this.playerglobalRepository.save({
      ...createPlayerglobalDto,
      id: generateUuid(),
      imageUrl: createPlayerglobalDto.imageUrl
        ? createPlayerglobalDto.imageUrl
        : null,
    });

    return new ReturnPlayerglobalDto(savedPlayerglobal);
  }

  async updatePlayerglobal(
    updatePlayerglobalDto: UpdatePlayerglobalDto,
    playerglobalId: string
  ): Promise<ReturnPlayerglobalDto> {
    const playerglobal = await this.getPlayerglobalById(playerglobalId);

    await this.countryService.getCountryById(updatePlayerglobalDto.countryId);

    const updatedPlayerglobal = await this.playerglobalRepository.save({
      ...playerglobal,
      ...updatePlayerglobalDto,
      imageUrl: updatePlayerglobalDto.imageUrl
        ? updatePlayerglobalDto.imageUrl
        : null,
    });

    return new ReturnPlayerglobalDto(updatedPlayerglobal);
  }

  async deletePlayerglobal(playerglobalId: string): Promise<DeleteResult> {
    await this.getPlayerglobalById(playerglobalId);

    return this.playerglobalRepository.delete({ id: playerglobalId });
  }
}
