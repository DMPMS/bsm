import { Request } from "express";
import { UserTypeEnum } from "../enums/UserType.enum";
import { ReturnUserDto } from "../dtos/returnUser.dto";

export interface AuthenticatedRequest extends Request {
  user?: ReturnUserDto;
  userType?: UserTypeEnum;
}
