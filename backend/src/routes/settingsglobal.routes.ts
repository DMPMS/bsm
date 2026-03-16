import { Router } from "express";
import { SettingsglobalService } from "../services/settingsglobal.service";
import { SettingsglobalController } from "../controllers/settingsglobal.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { UserTypeEnum } from "../enums/UserType.enum";

const settingsglobalRoutes = Router();

const settingsglobalService = new SettingsglobalService();
const settingsglobalController = new SettingsglobalController(
  settingsglobalService,
);

settingsglobalRoutes.get(
  "/settingsglobal",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (_, res) => settingsglobalController.getSettingsglobal(res),
);

settingsglobalRoutes.put(
  "/settingsglobal",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin]),
  (req, res) => settingsglobalController.updateSettingsglobal(req, res),
);

export default settingsglobalRoutes;
