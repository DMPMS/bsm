import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserTypeEnum } from "../enums/UserType.enum";
import { roleMiddleware } from "../middlewares/role.middleware";
import { PlayerglobalService } from "../services/playerglobal.service";
import { PlayerglobalController } from "../controllers/playerglobal.controller";

const playerglobalRoutes = Router();

const playerglobalService = new PlayerglobalService();
const playerglobalController = new PlayerglobalController(playerglobalService);

playerglobalRoutes.get(
  "/playerglobal",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => playerglobalController.getPlayerglobals(req, res)
);

playerglobalRoutes.get(
  "/playerglobal/:playerglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => playerglobalController.getPlayerglobalById(req, res)
);

playerglobalRoutes.post(
  "/playerglobal",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => playerglobalController.createPlayerglobal(req, res)
);

playerglobalRoutes.put(
  "/playerglobal/:playerglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => playerglobalController.updatePlayerglobal(req, res)
);

playerglobalRoutes.delete(
  "/playerglobal/:playerglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => playerglobalController.deletePlayerglobal(req, res)
);

export default playerglobalRoutes;
