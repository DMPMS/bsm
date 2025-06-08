import { Repository } from "typeorm";
import { CountryEntity } from "../entities/countryEntity";
import { AppDataSource } from "../config/orm";
import { ReturnCountryDto } from "../dtos/returnCountryDto";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { PAGINATION } from "../config/constants";
import { HttpError } from "../utils/httpError";
import { ERROR_MESSAGES } from "../utils/messages";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";

export class CountryService {
  constructor(
    private readonly countryRepository: Repository<CountryEntity> = AppDataSource.getRepository(
      CountryEntity
    )
  ) {}

  async getCountries(
    page: number,
    limit: number,
    relationsOptions?: RelationsOptionsType
  ): Promise<ReturnCountryDto[]> {
    const skip = (page - PAGINATION.INITIAL_PAGE) * limit;

    const countries = await this.countryRepository.find({
      // skip,
      // take: limit,
      relations: relationsOptions,
      order: { name: "ASC" },
    });

    return countries.map((country) => new ReturnCountryDto(country));
  }

  async getCountryById(
    countryId: string,
    relationsOptions?: RelationsOptionsType
  ): Promise<ReturnCountryDto> {
    const country = await this.countryRepository.findOne({
      where: { id: countryId },
      relations: relationsOptions,
    });

    if (!country) {
      throw new HttpError(
        HttpStatusEnum.NotFound,
        ERROR_MESSAGES.COUNTRY.COUNTRY_ID_NOT_FOUND(countryId)
      );
    }

    return new ReturnCountryDto(country);
  }
}
