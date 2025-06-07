import { plainToInstance } from "class-transformer";
import { AuthService } from "../services/authService";
import { SignInDto } from "../dtos/signInDto";
import { Request, Response } from "express";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
import { ERROR_MESSAGES } from "../utils/messages";
import { validateDto } from "../utils/validateDto";
import { HttpError } from "../utils/httpError";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signIn(req: Request, res: Response): Promise<void> {
    try {
      const signInDto = plainToInstance(SignInDto, req.body, {
        excludeExtraneousValues: true,
      });

      const isValid = await validateDto(signInDto);
      if (!isValid) {
        res
          .status(HttpStatusEnum.BadRequest)
          .json(ERROR_MESSAGES.DTO.INVALID_DATA);
        return;
      }

      const returnSignInDto = await this.authService.signIn(signInDto);

      res.status(HttpStatusEnum.Ok).json(returnSignInDto);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json(error.message);
      } else {
        res
          .status(HttpStatusEnum.InternalServerError)
          .json(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
      }
    }
  }
}
