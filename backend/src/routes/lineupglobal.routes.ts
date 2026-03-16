import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserTypeEnum } from "../enums/UserType.enum";
import { roleMiddleware } from "../middlewares/role.middleware";
import { LineupglobalService } from "../services/lineupglobal.service";
import { LineupglobalController } from "../controllers/lineupglobal.controller";

const lineupglobalRoutes = Router();

const lineupglobalService = new LineupglobalService();
const lineupglobalController = new LineupglobalController(lineupglobalService);

lineupglobalRoutes.get(
  "/teamglobal/:teamglobalId/lineupglobal",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => lineupglobalController.getLineupglobalsByTeamglobalId(req, res),
);

lineupglobalRoutes.get(
  "/teamglobal/lineupglobal/:lineupglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => lineupglobalController.getLineupglobalById(req, res),
);

lineupglobalRoutes.put(
  "/teamglobal/lineupglobal/:lineupglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => lineupglobalController.updateLineupglobal(req, res),
);

export default lineupglobalRoutes;
