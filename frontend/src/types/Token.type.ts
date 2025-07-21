import type { JwtPayload } from "jwt-decode";
import { UserTypeEnum } from "../enums/UserType.enum";
import type { UserType } from "./User.type";

export interface TokenType extends JwtPayload {
  user: UserType;
  userType: UserTypeEnum;
}
