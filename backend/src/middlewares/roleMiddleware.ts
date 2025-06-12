import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/AuthenticatedRequestType";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
import { UserTypeEnum } from "../enums/UserTypeEnum";
import { AUTH_MESSAGES } from "../utils/messages";

export const roleMiddleware = (allowedRoles: UserTypeEnum[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user || !allowedRoles.includes(req.user.type)) {
      res
        .status(HttpStatusEnum.Forbidden)
        .json(AUTH_MESSAGES.ERROR.ACCESS_DENIED);
      return;
    }
    next();
  };
};
