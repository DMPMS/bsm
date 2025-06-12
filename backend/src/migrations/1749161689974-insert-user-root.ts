import { MigrationInterface, QueryRunner } from "typeorm";
import { HttpError } from "../utils/httpError";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
import { ENV_MESSAGES } from "../utils/messages";
import { createHashedPassword } from "../utils/password";
import { UserTypeEnum } from "../enums/UserTypeEnum";
import { generateUuid } from "../utils/uuid";

export class InsertUserRoot1749161689974 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const rootEmail = process.env.ROOT_EMAIL;
    const rootPassword = process.env.ROOT_PASSWORD;

    if (!rootEmail || !rootPassword) {
      throw new HttpError(
        HttpStatusEnum.InternalServerError,
        ENV_MESSAGES.ERROR.MISSING_ROOT_EMAIL_OR_PASSWORD
      );
    }

    const hashedPassword = await createHashedPassword(rootPassword);
    const id = generateUuid();

    await queryRunner.query(`
        INSERT INTO public.user (id, country_id, name, birthdate, type, email, hashed_password)
        VALUES ('${id}', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Root', '2000-01-01', ${
      UserTypeEnum.Root
    }, '${rootEmail.toLowerCase()}', '${hashedPassword}');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const rootEmail = process.env.ROOT_EMAIL;

    if (!rootEmail) {
      throw new HttpError(
        HttpStatusEnum.InternalServerError,
        ENV_MESSAGES.ERROR.MISSING_ROOT_EMAIL
      );
    }

    await queryRunner.query(`
      DELETE FROM public.user WHERE email = '${rootEmail.toLowerCase()}';
    `);
  }
}
