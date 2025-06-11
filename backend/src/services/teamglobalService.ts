import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../config/orm";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { PAGINATION } from "../config/constants";
import { HttpError } from "../utils/httpError";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
import { ERROR_MESSAGES } from "../utils/messages";
import { CountryService } from "./countryService";
import { generateUuid } from "../utils/generateUuid";
import { TeamglobalEntity } from "../entities/teamglobalEntity";
import { ReturnTeamglobalDto } from "../dtos/returnTeamglobalDto";
import { CreateTeamglobalDto } from "../dtos/createTeamglobalDto";
import { ManagerglobalService } from "./managerglobalService";
import { UpdateTeamglobalDto } from "../dtos/updateTeamglobalDto";

export class TeamglobalService {
  private readonly countryService: CountryService;
  private readonly managerglobalService: ManagerglobalService;

  constructor(
    private readonly teamglobalRepository: Repository<TeamglobalEntity> = AppDataSource.getRepository(
      TeamglobalEntity
    )
  ) {
    this.countryService = new CountryService();
    this.managerglobalService = new ManagerglobalService();
  }

  async getTeamglobals(
    page: number,
    limit: number,
    relationsOptions?: RelationsOptionsType
  ): Promise<ReturnTeamglobalDto[]> {
    const skip = (page - PAGINATION.INITIAL_PAGE) * limit;

    const teamglobals = await this.teamglobalRepository.find({
      // skip,
      // take: limit,
      relations: relationsOptions,
      order: { createdAt: "DESC" },
    });

    return teamglobals.map((teamglobal) => new ReturnTeamglobalDto(teamglobal));
  }

  async getTeamglobalById(
    teamglobalId: string,
    relationsOptions?: RelationsOptionsType
  ): Promise<ReturnTeamglobalDto> {
    const teamglobal = await this.teamglobalRepository.findOne({
      where: { id: teamglobalId },
      relations: relationsOptions,
    });

    if (!teamglobal) {
      throw new HttpError(
        HttpStatusEnum.NotFound,
        ERROR_MESSAGES.TEAMGLOBAL.TEAMGLOBAL_ID_NOT_FOUND(teamglobalId)
      );
    }

    return new ReturnTeamglobalDto(teamglobal);
  }

  async createTeamglobal(
    createTeamglobalDto: CreateTeamglobalDto
  ): Promise<ReturnTeamglobalDto> {
    await this.countryService.getCountryById(createTeamglobalDto.countryId);
    await this.managerglobalService.getManagerglobalById(
      createTeamglobalDto.managerglobalId,
      undefined,
      true
    );

    const savedTeamglobal = await this.teamglobalRepository.save({
      ...createTeamglobalDto,
      id: generateUuid(),
      imageUrl: createTeamglobalDto.imageUrl
        ? createTeamglobalDto.imageUrl
        : null,
      abbreviation: createTeamglobalDto.abbreviation.toUpperCase(),
    });

    return new ReturnTeamglobalDto(savedTeamglobal);
  }

  async updateTeamglobal(
    updateTeamglobalDto: UpdateTeamglobalDto,
    teamglobalId: string
  ): Promise<ReturnTeamglobalDto> {
    const teamglobal = await this.getTeamglobalById(teamglobalId, {
      managerglobal: true,
    });

    await this.countryService.getCountryById(updateTeamglobalDto.countryId);

    if (updateTeamglobalDto.managerglobalId !== teamglobal.managerglobal?.id) {
      await this.managerglobalService.getManagerglobalById(
        updateTeamglobalDto.managerglobalId,
        undefined,
        true
      );
    }

    delete teamglobal.managerglobal;

    const updatedTeamglobal = await this.teamglobalRepository.save({
      ...teamglobal,
      ...updateTeamglobalDto,
      imageUrl: updateTeamglobalDto.imageUrl
        ? updateTeamglobalDto.imageUrl
        : null,
      abbreviation: updateTeamglobalDto.abbreviation.toUpperCase(),
    });

    return new ReturnTeamglobalDto(updatedTeamglobal);
  }

  async deleteTeamglobal(teamglobalId: string): Promise<DeleteResult> {
    await this.getTeamglobalById(teamglobalId);

    return this.teamglobalRepository.delete({ id: teamglobalId });
  }
}
