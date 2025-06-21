import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserTypeEnum } from "../enums/UserType.enum";
import { roleMiddleware } from "../middlewares/role.middleware";
import { RuleService } from "../services/rule.service";
import { RuleController } from "../controllers/rule.controller";

const ruleRoutes = Router();

const ruleService = new RuleService();
const ruleController = new RuleController(ruleService);

ruleRoutes.get(
  "/rule",
  authMiddleware,
  roleMiddleware([UserTypeEnum.Admin, UserTypeEnum.User]),
  (req, res) => ruleController.getRules(req, res)
);

export default ruleRoutes;
