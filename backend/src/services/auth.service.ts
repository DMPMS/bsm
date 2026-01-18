import { Repository } from "typeorm";
import { AppDataSource } from "../config/orm";
import { UserEntity } from "../entities/user.entity";
import { validatePassword } from "../utils/password";
import jwt from "jsonwebtoken";
import { AUTH_MESSAGES, ENV_MESSAGES } from "../utils/messages";
import { StringValue } from "ms";
import { HttpError } from "../utils/httpError";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { SignInDto } from "../dtos/signIn.dto";
import { ReturnAuthDto } from "../dtos/returnAuth.dto";
import { ReturnUserDto } from "../dtos/returnUser.dto";

export class AuthService {
  constructor(
    private readonly userRepository: Repository<UserEntity> = AppDataSource.getRepository(
      UserEntity,
    ),
  ) {}

  async signIn(signInDto: SignInDto): Promise<ReturnAuthDto> {
    const user = await this.userRepository.findOne({
      where: { email: signInDto.email.toLowerCase() },
      relations: { country: true },
    });

    if (!user) {
      throw new HttpError(
        HttpStatusEnum.Unauthorized,
        AUTH_MESSAGES.ERROR.INVALID_CREDENTIALS,
      );
    }

    const isMatch = await validatePassword(
      signInDto.password,
      user.hashedPassword,
    );

    if (!isMatch) {
      throw new HttpError(
        HttpStatusEnum.Unauthorized,
        AUTH_MESSAGES.ERROR.INVALID_CREDENTIALS,
      );
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new HttpError(
        HttpStatusEnum.InternalServerError,
        ENV_MESSAGES.ERROR.MISSING_JWT_SECRET,
      );
    }

    const jwtExpiresIn = process.env.JWT_EXPIRES_IN as StringValue;

    if (!jwtExpiresIn) {
      throw new HttpError(
        HttpStatusEnum.InternalServerError,
        ENV_MESSAGES.ERROR.MISSING_JWT_EXPIRES_IN,
      );
    }

    const token = jwt.sign(
      {
        user: new ReturnUserDto(user),
        userType: user.type,
      },
      jwtSecret,
      {
        expiresIn: jwtExpiresIn,
      },
    );

    return new ReturnAuthDto({ token: `Bearer ${token}` });
  }
}
