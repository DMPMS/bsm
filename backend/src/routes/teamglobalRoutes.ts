import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UserTypeEnum } from "../enums/UserTypeEnum";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { TeamglobalService } from "../services/teamglobalService";
import { TeamglobalController } from "../controllers/teamglobalController";

const teamglobalRoutes = Router();

const teamglobalService = new TeamglobalService();
const teamglobalController = new TeamglobalController(teamglobalService);

teamglobalRoutes.get(
  "/teamglobal",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => teamglobalController.getTeamglobals(req, res)
);

teamglobalRoutes.get(
  "/teamglobal/:teamglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => teamglobalController.getTeamglobalById(req, res)
);

teamglobalRoutes.post(
  "/teamglobal",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => teamglobalController.createTeamglobal(req, res)
);

teamglobalRoutes.put(
  "/teamglobal/:teamglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => teamglobalController.updateTeamglobal(req, res)
);

teamglobalRoutes.delete(
  "/teamglobal/:teamglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => teamglobalController.deleteTeamglobal(req, res)
);

export default teamglobalRoutes;
