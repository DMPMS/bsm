import { Request, Response } from "express";
import { PAGINATION } from "../config/constants";
import { UserService } from "../services/user.service";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.type";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { HttpError } from "../utils/httpError";
import { DTO_MESSAGES, USER_MESSAGES } from "../utils/messages";
import { plainToInstance } from "class-transformer";
import { CreateUserDto } from "../dtos/createUser.dto";
import { validateDto } from "../utils/validateDto";
import { UpdateUserDto } from "../dtos/updateUser.dto";
import { DeleteUserDto } from "../dtos/deleteUser.dto";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { ReturnUserDto } from "../dtos/returnUser.dto";
import { isUuid } from "../utils/uuid";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const {
        page = PAGINATION.DEFAULT_PAGE,
        limit = PAGINATION.DEFAULT_LIMIT,
      } = req.query;

      const relationsOptions: RelationsOptionsType = {
        country: true,
      };

      const users = await this.userService.getUsers(
        Number(page),
        Number(limit),
        relationsOptions
      );

      res
        .status(HttpStatusEnum.Ok)
        .json(users.map((user) => new ReturnUserDto(user)));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }

        res
          .status(HttpStatusEnum.InternalServerError)
          .json(USER_MESSAGES.ERROR.SELECT_USER_ERROR);
      }
    }
  }

  async getUserInfo(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(USER_MESSAGES.ERROR.USER_ID_IS_REQUIRED);
        return;
      }

      const relationsOptions: RelationsOptionsType = {
        country: true,
      };

      const user = await this.userService.getUserInfo(userId, relationsOptions);

      res.status(HttpStatusEnum.Ok).json(new ReturnUserDto(user));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }

        res
          .status(HttpStatusEnum.InternalServerError)
          .json(USER_MESSAGES.ERROR.SELECT_USER_INFO_ERROR);
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
          .json(DTO_MESSAGES.ERROR.INVALID_DATA);
        return;
      }

      const savedUser = await this.userService.createUser(createUserDto);

      res.status(HttpStatusEnum.Created).json(new ReturnUserDto(savedUser));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }

        res
          .status(HttpStatusEnum.InternalServerError)
          .json(USER_MESSAGES.ERROR.CREATE_USER_ERROR);
      }
    }
  }

  async createAdmin(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const createUserDto = plainToInstance(CreateUserDto, req.body, {
        excludeExtraneousValues: true,
      });

      const userId = req.user?.id;
      const userType = req.userType;

      const isValid = await validateDto(createUserDto);
      if (!isValid) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(DTO_MESSAGES.ERROR.INVALID_DATA);
        return;
      }

      if (!userId) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(USER_MESSAGES.ERROR.USER_ID_IS_REQUIRED);
        return;
      }

      if (!userType) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(USER_MESSAGES.ERROR.USER_TYPE_IS_REQUIRED);
        return;
      }

      const savedUser = await this.userService.createUser(
        createUserDto,
        userId,
        userType
      );

      res.status(HttpStatusEnum.Created).json(new ReturnUserDto(savedUser));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }

        res
          .status(HttpStatusEnum.InternalServerError)
          .json(USER_MESSAGES.ERROR.CREATE_USER_ERROR);
      }
    }
  }

  async updateUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const updateUserDto = plainToInstance(UpdateUserDto, req.body, {
        excludeExtraneousValues: true,
      });

      const userId = req.user?.id;

      const isValid = await validateDto(updateUserDto);
      if (!isValid) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(DTO_MESSAGES.ERROR.INVALID_DATA);
        return;
      }

      if (!userId) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(USER_MESSAGES.ERROR.USER_ID_IS_REQUIRED);
        return;
      }

      const updatedUser = await this.userService.updateUser(
        updateUserDto,
        userId
      );

      res.status(HttpStatusEnum.Ok).json(new ReturnUserDto(updatedUser));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }

        res
          .status(HttpStatusEnum.InternalServerError)
          .json(USER_MESSAGES.ERROR.UPDATE_USER_ERROR);
      }
    }
  }

  async deleteMyUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const deleteUserDto = plainToInstance(DeleteUserDto, req.body, {
        excludeExtraneousValues: true,
      });

      const userId = req.user?.id;

      const isValid = await validateDto(deleteUserDto);
      if (!isValid) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(DTO_MESSAGES.ERROR.INVALID_DATA);
        return;
      }

      if (!userId) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(USER_MESSAGES.ERROR.USER_ID_IS_REQUIRED);
        return;
      }

      await this.userService.deleteMyUser(deleteUserDto, userId);

      res
        .status(HttpStatusEnum.Ok)
        .json(USER_MESSAGES.SUCCESS.MY_USER_DELETED_SUCCESSFULLY);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }

        res
          .status(HttpStatusEnum.InternalServerError)
          .json(USER_MESSAGES.ERROR.DELETE_MY_USER_ERROR);
      }
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { userDeleteId } = req.params;

      if (!userDeleteId || !isUuid(userDeleteId)) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(USER_MESSAGES.ERROR.USER_DELETE_ID_IS_INVALID);
        return;
      }

      await this.userService.deleteUser(userDeleteId);

      res
        .status(HttpStatusEnum.Ok)
        .json(USER_MESSAGES.SUCCESS.USER_DELETED_SUCCESSFULLY);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }

        res
          .status(HttpStatusEnum.InternalServerError)
          .json(USER_MESSAGES.ERROR.DELETE_USER_ERROR);
      }
    }
  }

  async deleteAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { adminDeleteId } = req.params;

      if (!adminDeleteId || !isUuid(adminDeleteId)) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(USER_MESSAGES.ERROR.ADMIN_DELETE_ID_IS_INVALID);
        return;
      }

      await this.userService.deleteAdmin(adminDeleteId);

      res
        .status(HttpStatusEnum.Ok)
        .json(USER_MESSAGES.SUCCESS.ADMIN_DELETED_SUCCESSFULLY);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }

        res
          .status(HttpStatusEnum.InternalServerError)
          .json(USER_MESSAGES.ERROR.DELETE_ADMIN_ERROR);
      }
    }
  }
}
