import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.type";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { UserTypeEnum } from "../enums/UserType.enum";
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
