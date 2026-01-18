import { Router } from "express";
import { PositionService } from "../services/position.service";
import { PositionController } from "../controllers/position.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserTypeEnum } from "../enums/UserType.enum";
import { roleMiddleware } from "../middlewares/role.middleware";

const positionRoutes = Router();

const positionService = new PositionService();
const positionController = new PositionController(positionService);

positionRoutes.get(
  "/position",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin, UserTypeEnum.User]),
  (req, res) => positionController.getPositions(req, res),
);

export default positionRoutes;
