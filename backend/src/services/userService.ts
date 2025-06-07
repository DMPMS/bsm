import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../config/orm";
import { UserEntity } from "../entities/userEntity";
import { ERROR_MESSAGES } from "../utils/messages";
import { createHashedPassword, validatePassword } from "../utils/password";
import { RelationsOptionsType } from "../types/RelationsOptions.type";
import { UserTypeEnum } from "../enums/UserTypeEnum";
import { PAGINATION } from "../config/constants";
import { HttpError } from "../utils/httpError";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
import { ReturnUserDto } from "../dtos/returnUserDto";
import { CreateUserDto } from "../dtos/createUserDto";
import { generateUuid } from "../utils/generateUuid";
import { UpdateUserDto } from "../dtos/updateUserDto";
import { DeleteUserDto } from "../dtos/deleteUserDto";

export class UserService {
  constructor(
    private readonly userRepository: Repository<UserEntity> = AppDataSource.getRepository(
      UserEntity
    )
  ) {}

  async getUsers(
    page: number,
    limit: number,
    relationsOptions?: RelationsOptionsType
  ): Promise<ReturnUserDto[]> {
    const skip = (page - PAGINATION.INITIAL_PAGE) * limit;

    const users = await this.userRepository.find({
      // skip,
      // take: limit,
      relations: relationsOptions,
      where: { type: UserTypeEnum.User },
    });

    return users.map((user) => new ReturnUserDto(user));
  }

  async getUserInfo(
    userId: string,
    relationsOptions?: RelationsOptionsType
  ): Promise<ReturnUserDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: relationsOptions,
    });

    if (!user) {
      throw new HttpError(
        HttpStatusEnum.NotFound,
        ERROR_MESSAGES.USER.USER_ID_NOT_FOUND(userId)
      );
    }

    return new ReturnUserDto(user);
  }

  async getUserById(
    userId: string,
    relationsOptions?: RelationsOptionsType
  ): Promise<ReturnUserDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId, type: UserTypeEnum.User },
      relations: relationsOptions,
    });

    if (!user) {
      throw new HttpError(
        HttpStatusEnum.NotFound,
        ERROR_MESSAGES.USER.USER_ID_NOT_FOUND(userId)
      );
    }

    return new ReturnUserDto(user);
  }

  async getUserByEmail(
    email: string,
    relationsOptions?: RelationsOptionsType
  ): Promise<ReturnUserDto> {
    const user = await this.userRepository.findOne({
      where: { email: email.toLowerCase() },
      relations: relationsOptions,
    });

    if (!user) {
      throw new HttpError(
        HttpStatusEnum.NotFound,
        ERROR_MESSAGES.USER.USER_EMAIL_NOT_FOUND(email.toLowerCase())
      );
    }

    return new ReturnUserDto(user);
  }

  async createUser(
    createUserDto: CreateUserDto,
    userId?: string,
    userType?: UserTypeEnum
  ): Promise<ReturnUserDto> {
    const existingUser = await this.getUserByEmail(createUserDto.email).catch(
      () => undefined
    );

    if (existingUser) {
      throw new HttpError(
        HttpStatusEnum.Conflict,
        ERROR_MESSAGES.USER.EMAIL_ALREADY_EXISTS
      );
    }

    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new HttpError(
        HttpStatusEnum.BadRequest,
        ERROR_MESSAGES.USER.PASSWORDS_DO_NOT_MATCH
      );
    }

    const hashedPassword = await createHashedPassword(createUserDto.password);
    createUserDto.email = createUserDto.email.toLowerCase();

    let savedUser: UserEntity;

    if (userId && userType === UserTypeEnum.Root) {
      const userRoot = await this.userRepository.findOne({
        where: { id: userId, type: userType },
      });

      if (!userRoot) {
        throw new HttpError(
          HttpStatusEnum.NotFound,
          ERROR_MESSAGES.USER.USER_ROOT_ID_NOT_FOUND(userId)
        );
      } else {
        savedUser = await this.userRepository.save({
          ...createUserDto,
          id: generateUuid(),
          imageUrl: createUserDto.imageUrl ? createUserDto.imageUrl : null,
          type: UserTypeEnum.Admin,
          hashedPassword: hashedPassword,
        });
      }
    } else {
      savedUser = await this.userRepository.save({
        ...createUserDto,
        id: generateUuid(),
        imageUrl: createUserDto.imageUrl ? createUserDto.imageUrl : null,
        type: UserTypeEnum.User,
        hashedPassword: hashedPassword,
      });
    }

    return new ReturnUserDto(savedUser);
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    userId: string
  ): Promise<ReturnUserDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpError(
        HttpStatusEnum.NotFound,
        ERROR_MESSAGES.USER.USER_ID_NOT_FOUND(userId)
      );
    }

    updateUserDto.email = updateUserDto.email.toLowerCase();

    if (user.email !== updateUserDto.email) {
      const existingUser = await this.getUserByEmail(updateUserDto.email).catch(
        () => undefined
      );

      if (existingUser) {
        throw new HttpError(
          HttpStatusEnum.Conflict,
          ERROR_MESSAGES.USER.EMAIL_ALREADY_EXISTS
        );
      }
    }

    if (updateUserDto.newPassword) {
      if (updateUserDto.newPassword !== updateUserDto.confirmNewPassword) {
        throw new HttpError(
          HttpStatusEnum.BadRequest,
          ERROR_MESSAGES.USER.PASSWORDS_DO_NOT_MATCH
        );
      }
    }

    const newHashedPassword = updateUserDto.newPassword
      ? await createHashedPassword(updateUserDto.newPassword)
      : undefined;

    const isMatch = await validatePassword(
      updateUserDto.password,
      user.hashedPassword
    );

    if (!isMatch) {
      throw new HttpError(
        HttpStatusEnum.BadRequest,
        ERROR_MESSAGES.USER.INVALID_USER_PASSWORD
      );
    }

    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
      imageUrl: updateUserDto.imageUrl ? updateUserDto.imageUrl : null,
      hashedPassword: newHashedPassword
        ? newHashedPassword
        : user.hashedPassword,
    });

    return new ReturnUserDto(updatedUser);
  }

  async deleteMyUser(
    deleteUserDto: DeleteUserDto,
    userId: string
  ): Promise<DeleteResult> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpError(
        HttpStatusEnum.NotFound,
        ERROR_MESSAGES.USER.USER_ID_NOT_FOUND(userId)
      );
    }

    const isMatch = await validatePassword(
      deleteUserDto.password,
      user.hashedPassword
    );

    if (!isMatch) {
      throw new HttpError(
        HttpStatusEnum.BadRequest,
        ERROR_MESSAGES.USER.INVALID_USER_PASSWORD
      );
    }

    return this.userRepository.delete({ id: userId });
  }

  async deleteUser(userDeleteId: string): Promise<DeleteResult> {
    await this.getUserById(userDeleteId);

    return this.userRepository.delete({ id: userDeleteId });
  }

  async deleteAdmin(adminDeleteId: string): Promise<DeleteResult> {
    const admin = await this.userRepository.findOne({
      where: { id: adminDeleteId, type: UserTypeEnum.Admin },
    });

    if (!admin) {
      throw new HttpError(
        HttpStatusEnum.NotFound,
        ERROR_MESSAGES.USER.USER_ADMIN_ID_NOT_FOUND(adminDeleteId)
      );
    }

    return this.userRepository.delete({ id: adminDeleteId });
  }
}
