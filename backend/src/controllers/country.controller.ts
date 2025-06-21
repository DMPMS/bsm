import { Request, Response } from "express";
import { CountryService } from "../services/country.service";
import { PAGINATION } from "../config/constants";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { HttpError } from "../utils/httpError";
import { COUNTRY_MESSAGES } from "../utils/messages";
import { ReturnCountryDto } from "../dtos/returnCountry.dto";

export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  async getCountries(req: Request, res: Response): Promise<void> {
    try {
      const {
        page = PAGINATION.DEFAULT_PAGE,
        limit = PAGINATION.DEFAULT_LIMIT,
      } = req.query;

      const countries = await this.countryService.getCountries(
        Number(page),
        Number(limit)
      );

      res
        .status(HttpStatusEnum.Ok)
        .json(countries.map((country) => new ReturnCountryDto(country)));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(COUNTRY_MESSAGES.ERROR.SELECT_COUNTRY_ERROR);
      }
    }
  }
}
