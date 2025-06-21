import { Repository } from "typeorm";
import { CountryEntity } from "../entities/country.entity";
import { AppDataSource } from "../config/orm";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { PAGINATION } from "../config/constants";
import { HttpError } from "../utils/httpError";
import { COUNTRY_MESSAGES } from "../utils/messages";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";

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
  ): Promise<CountryEntity[]> {
    const skip = (page - PAGINATION.INITIAL_PAGE) * limit;

    const countries = await this.countryRepository.find({
      // skip,
      // take: limit,
      relations: relationsOptions,
      order: { name: "ASC" },
    });

    return countries;
  }

  async getCountryById(
    countryId: string,
    relationsOptions?: RelationsOptionsType
  ): Promise<CountryEntity> {
    const country = await this.countryRepository.findOne({
      where: { id: countryId },
      relations: relationsOptions,
    });

    if (!country) {
      throw new HttpError(
        HttpStatusEnum.NotFound,
        COUNTRY_MESSAGES.ERROR.COUNTRY_ID_NOT_FOUND(countryId)
      );
    }

    return country;
  }
}
