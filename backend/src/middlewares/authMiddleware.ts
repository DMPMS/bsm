import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
import { ERROR_MESSAGES } from "../utils/messages";
import { AuthenticatedRequest } from "../types/AuthenticatedRequestType";
import { UserTypeEnum } from "../enums/UserTypeEnum";

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    res
      .status(HttpStatusEnum.Unauthorized)
      .json(ERROR_MESSAGES.AUTH.ACCESS_DENIED);
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    res
      .status(HttpStatusEnum.InternalServerError)
      .json(ERROR_MESSAGES.ENV.MISSING_JWT_SECRET);
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret) as {
      user: {
        id: string;
        name: string;
        email: string;
        type: UserTypeEnum;
      };
    };

    req.user = decoded.user;

    next();
  } catch (error) {
    res
      .status(HttpStatusEnum.Unauthorized)
      .json(ERROR_MESSAGES.AUTH.ACCESS_DENIED);
  }
};
