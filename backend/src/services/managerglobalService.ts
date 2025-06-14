import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../config/orm";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { PAGINATION } from "../config/constants";
import { HttpError } from "../utils/httpError";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
import { MANAGERGLOBAL_MESSAGES } from "../utils/messages";
import { ManagerglobalEntity } from "../entities/managerglobalEntity";
import { CreateManagerglobalDto } from "../dtos/createManagerglobalDto";
import { CountryService } from "./countryService";
import { generateUuid } from "../utils/uuid";
import { UpdateManagerglobalDto } from "../dtos/updateManagerglobalDto";

export class ManagerglobalService {
  private readonly countryService: CountryService;

  constructor(
    private readonly managerglobalRepository: Repository<ManagerglobalEntity> = AppDataSource.getRepository(
      ManagerglobalEntity
    )
  ) {
    this.countryService = new CountryService();
  }

  async getManagerglobals(
    page: number,
    limit: number,
    relationsOptions?: RelationsOptionsType
  ): Promise<ManagerglobalEntity[]> {
    const skip = (page - PAGINATION.INITIAL_PAGE) * limit;

    const managerglobals = await this.managerglobalRepository.find({
      // skip,
      // take: limit,
      relations: relationsOptions,
      order: { createdAt: "DESC" },
    });

    return managerglobals;
  }

  async getManagerglobalById(
    managerglobalId: string,
    relationsOptions?: RelationsOptionsType,
    onlyWithoutTeamglobal = false
  ): Promise<ManagerglobalEntity> {
    if (onlyWithoutTeamglobal) {
      relationsOptions = {
        ...relationsOptions,
        teamglobal: true,
      };
    }

    const managerglobal = await this.managerglobalRepository.findOne({
      where: { id: managerglobalId },
      relations: relationsOptions,
    });

    if (!managerglobal) {
      throw new HttpError(
        HttpStatusEnum.NotFound,
        MANAGERGLOBAL_MESSAGES.ERROR.MANAGERGLOBAL_ID_NOT_FOUND(managerglobalId)
      );
    }

    if (onlyWithoutTeamglobal && managerglobal.teamglobal) {
      throw new HttpError(
        HttpStatusEnum.Conflict,
        MANAGERGLOBAL_MESSAGES.ERROR.MANAGERGLOBAL_WITH_TEAMGLOBAL(
          managerglobalId
        )
      );
    }

    return managerglobal;
  }

  async createManagerglobal(
    createManagerglobalDto: CreateManagerglobalDto
  ): Promise<ManagerglobalEntity> {
    await this.countryService.getCountryById(createManagerglobalDto.countryId);

    const savedManagerglobal = await this.managerglobalRepository.save({
      ...createManagerglobalDto,
      id: generateUuid(),
      imageUrl: createManagerglobalDto.imageUrl
        ? createManagerglobalDto.imageUrl
        : null,
    });

    return savedManagerglobal;
  }

  async updateManagerglobal(
    updateManagerglobalDto: UpdateManagerglobalDto,
    managerglobalId: string
  ): Promise<ManagerglobalEntity> {
    const managerglobal = await this.getManagerglobalById(managerglobalId);

    await this.countryService.getCountryById(updateManagerglobalDto.countryId);

    const updatedManagerglobal = await this.managerglobalRepository.save({
      ...managerglobal,
      ...updateManagerglobalDto,
      imageUrl: updateManagerglobalDto.imageUrl
        ? updateManagerglobalDto.imageUrl
        : null,
    });

    return updatedManagerglobal;
  }

  async deleteManagerglobal(managerglobalId: string): Promise<DeleteResult> {
    await this.getManagerglobalById(managerglobalId, undefined, true);

    return this.managerglobalRepository.delete({ id: managerglobalId });
  }
}
