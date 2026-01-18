import { Router } from "express";
import { ManagerglobalService } from "../services/managerglobal.service";
import { ManagerglobalController } from "../controllers/managerglobal.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserTypeEnum } from "../enums/UserType.enum";
import { roleMiddleware } from "../middlewares/role.middleware";

const managerglobalRoutes = Router();

const managerglobalService = new ManagerglobalService();
const managerglobalController = new ManagerglobalController(
  managerglobalService,
);

managerglobalRoutes.get(
  "/managerglobal",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin, UserTypeEnum.User]),
  (req, res) => managerglobalController.getManagerglobals(req, res),
);

managerglobalRoutes.get(
  "/managerglobal/:managerglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => managerglobalController.getManagerglobalById(req, res),
);

managerglobalRoutes.post(
  "/managerglobal",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => managerglobalController.createManagerglobal(req, res),
);

managerglobalRoutes.put(
  "/managerglobal/:managerglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => managerglobalController.updateManagerglobal(req, res),
);

managerglobalRoutes.delete(
  "/managerglobal/:managerglobalId",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => managerglobalController.deleteManagerglobal(req, res),
);

export default managerglobalRoutes;
