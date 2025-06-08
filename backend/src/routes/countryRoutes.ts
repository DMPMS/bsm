import { Router } from "express";
import { CountryService } from "../services/countryService";
import { CountryController } from "../controllers/countryController";

const countryRoutes = Router();

const countryService = new CountryService();
const countryController = new CountryController(countryService);

countryRoutes.get("/country", (req, res) =>
  countryController.getCountries(req, res)
);

export default countryRoutes;
