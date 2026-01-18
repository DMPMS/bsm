import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserTypeEnum } from "../enums/UserType.enum";
import { roleMiddleware } from "../middlewares/role.middleware";
import { CompetitionglobalService } from "../services/competitionglobal.service";
import { CompetitionglobalController } from "../controllers/competitionglobal.controller";

const competitionglobalRoutes = Router();

const competitionglobalService = new CompetitionglobalService();
const competitionglobalController = new CompetitionglobalController(
  competitionglobalService,
);

competitionglobalRoutes.get(
  "/competitionglobal",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin, UserTypeEnum.User]),
  (req, res) => competitionglobalController.getCompetitionglobals(req, res),
);

competitionglobalRoutes.get(
  "/competitionglobal/:competitionglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => competitionglobalController.getCompetitionglobalById(req, res),
);

competitionglobalRoutes.post(
  "/competitionglobal",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => competitionglobalController.createCompetitionglobal(req, res),
);

competitionglobalRoutes.put(
  "/competitionglobal/:competitionglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => competitionglobalController.updateCompetitionglobal(req, res),
);

competitionglobalRoutes.delete(
  "/competitionglobal/:competitionglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => competitionglobalController.deleteCompetitionglobal(req, res),
);

export default competitionglobalRoutes;
