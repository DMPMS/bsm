import { Router } from "express";
import { PositionService } from "../services/positionService";
import { PositionController } from "../controllers/positionController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UserTypeEnum } from "../enums/UserTypeEnum";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const positionRoutes = Router();

const positionService = new PositionService();
const positionController = new PositionController(positionService);

positionRoutes.get(
  "/position",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin, UserTypeEnum.User]),
  (req, res) => positionController.getPositions(req, res)
);

export default positionRoutes;
