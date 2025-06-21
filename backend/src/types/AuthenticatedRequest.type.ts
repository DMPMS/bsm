import { Request } from "express";
import { UserTypeEnum } from "../enums/UserType.enum";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
    type: UserTypeEnum;
  };
}
