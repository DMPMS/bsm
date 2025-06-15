import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UserTypeEnum } from "../enums/UserTypeEnum";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { RuleService } from "../services/ruleService";
import { RuleController } from "../controllers/ruleController";

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
