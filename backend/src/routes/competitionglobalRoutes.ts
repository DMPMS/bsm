import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UserTypeEnum } from "../enums/UserTypeEnum";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { CompetitionglobalService } from "../services/competitionglobalService";
import { CompetitionglobalController } from "../controllers/competitionglobalController";

const competitionglobalRoutes = Router();

const competitionglobalService = new CompetitionglobalService();
const competitionglobalController = new CompetitionglobalController(
  competitionglobalService
);

competitionglobalRoutes.get(
  "/competitionglobal",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => competitionglobalController.getCompetitionglobals(req, res)
);

competitionglobalRoutes.get(
  "/competitionglobal/:competitionglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => competitionglobalController.getCompetitionglobalById(req, res)
);

competitionglobalRoutes.post(
  "/competitionglobal",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => competitionglobalController.createCompetitionglobal(req, res)
);

competitionglobalRoutes.put(
  "/competitionglobal/:competitionglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => competitionglobalController.updateCompetitionglobal(req, res)
);

competitionglobalRoutes.delete(
  "/competitionglobal/:competitionglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => competitionglobalController.deleteCompetitionglobal(req, res)
);

export default competitionglobalRoutes;
