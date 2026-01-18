import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.type";
import { UserTypeEnum } from "../enums/UserType.enum";
import { AUTH_MESSAGES, ENV_MESSAGES } from "../utils/messages";
import { ReturnUserDto } from "../dtos/returnUser.dto";

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    res
      .status(HttpStatusEnum.Unauthorized)
      .json(AUTH_MESSAGES.ERROR.ACCESS_DENIED);
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    res
      .status(HttpStatusEnum.InternalServerError)
      .json(ENV_MESSAGES.ERROR.MISSING_JWT_SECRET);
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, jwtSecret) as {
      user: ReturnUserDto;
      userType: UserTypeEnum;
    };

    req.user = decodedToken.user;
    req.userType = decodedToken.userType;

    next();
  } catch (error) {
    res
      .status(HttpStatusEnum.Unauthorized)
      .json(AUTH_MESSAGES.ERROR.ACCESS_DENIED);
  }
};
