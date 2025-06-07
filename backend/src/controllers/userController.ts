import { Request, Response } from "express";
import { PAGINATION } from "../config/constants";
import { UserService } from "../services/userService";
import { AuthenticatedRequest } from "../types/AuthenticatedRequestType";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
import { HttpError } from "../utils/httpError";
import { ERROR_MESSAGES } from "../utils/messages";
import { plainToInstance } from "class-transformer";
import { CreateUserDto } from "../dtos/createUserDto";
import { validateDto } from "../utils/validateDto";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getUsers(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const {
        page = PAGINATION.DEFAULT_PAGE,
        limit = PAGINATION.DEFAULT_LIMIT,
      } = req.query;

      const users = await this.userService.getUsers(
        Number(page),
        Number(limit)
      );

      res.status(HttpStatusEnum.Ok).json(users);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.USER.SELECT_USER_ERROR);
      }
    }
  }

  async getUserInfo(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.USER.USER_ID_IS_REQUIRED);
        return;
      }

      const user = await this.userService.getUserInfo(userId);

      res.status(HttpStatusEnum.Ok).json(user);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.USER.SELECT_USER_INFO_ERROR);
      }
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const createUserDto = plainToInstance(CreateUserDto, req.body, {
        excludeExtraneousValues: true,
      });

      const isValid = await validateDto(createUserDto);
      if (!isValid) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.DTO.INVALID_DATA);
        return;
      }

      const savedUser = await this.userService.createUser(createUserDto);

      res.status(HttpStatusEnum.Created).json(savedUser);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.USER.CREATE_USER_ERROR);
      }
    }
  }

  async createAdmin(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const createUserDto = plainToInstance(CreateUserDto, req.body, {
        excludeExtraneousValues: true,
      });

      const userId = req.user?.id;
      const userType = req.user?.type;

      const isValid = await validateDto(createUserDto);
      if (!isValid) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.DTO.INVALID_DATA);
        return;
      }

      if (!userId) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.USER.USER_ID_IS_REQUIRED);
        return;
      }

      if (!userType) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.USER.USER_TYPE_IS_REQUIRED);
        return;
      }

      const savedUser = await this.userService.createUser(
        createUserDto,
        userId,
        userType
      );

      res.status(HttpStatusEnum.Created).json(savedUser);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.USER.CREATE_USER_ERROR);
      }
    }
  }
}
