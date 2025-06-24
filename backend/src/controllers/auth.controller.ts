import { plainToInstance } from "class-transformer";
import { AuthService } from "../services/auth.service";
import { SignInDto } from "../dtos/signIn.dto";
import { Request, Response } from "express";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { validateDto } from "../utils/validateDto";
import { HttpError } from "../utils/httpError";
import { AUTH_MESSAGES, DTO_MESSAGES } from "../utils/messages";

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
          .json(DTO_MESSAGES.ERROR.INVALID_DATA);
        return;
      }

      const returnSignInDto = await this.authService.signIn(signInDto);

      res.status(HttpStatusEnum.Ok).json(returnSignInDto);
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
          .json(AUTH_MESSAGES.ERROR.SIGN_IN_ERROR);
      }
    }
  }
}
