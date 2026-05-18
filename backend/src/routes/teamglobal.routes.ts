import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserTypeEnum } from "../enums/UserType.enum";
import { roleMiddleware } from "../middlewares/role.middleware";
import { TeamglobalService } from "../services/teamglobal.service";
import { TeamglobalController } from "../controllers/teamglobal.controller";

const teamglobalRoutes = Router();

const teamglobalService = new TeamglobalService();
const teamglobalController = new TeamglobalController(teamglobalService);

teamglobalRoutes.get(
  "/teamglobal",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin, UserTypeEnum.User]),
  (req, res) => teamglobalController.getTeamglobals(req, res),
);

teamglobalRoutes.get(
  "/teamglobal/:teamglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => teamglobalController.getTeamglobalById(req, res),
);

teamglobalRoutes.post(
  "/teamglobal",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => teamglobalController.createTeamglobal(req, res),
);

teamglobalRoutes.put(
  "/teamglobal/:teamglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => teamglobalController.updateTeamglobal(req, res),
);

teamglobalRoutes.patch(
  "/teamglobal/:teamglobalId/lineupglobal",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => teamglobalController.updateActiveLineupglobal(req, res),
);

teamglobalRoutes.delete(
  "/teamglobal/:teamglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => teamglobalController.deleteTeamglobal(req, res),
);

export default teamglobalRoutes;
