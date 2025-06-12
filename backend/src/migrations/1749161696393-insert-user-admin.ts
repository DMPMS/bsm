import { MigrationInterface, QueryRunner } from "typeorm";
import { HttpError } from "../utils/httpError";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
import { createHashedPassword } from "../utils/password";
import { UserTypeEnum } from "../enums/UserTypeEnum";
import { generateUuid } from "../utils/uuid";
import { ENV_MESSAGES } from "../utils/messages";

export class InsertUserAdmin1749161696393 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new HttpError(
        HttpStatusEnum.InternalServerError,
        ENV_MESSAGES.ERROR.MISSING_ADMIN_EMAIL_OR_PASSWORD
      );
    }

    const hashedPassword = await createHashedPassword(adminPassword);
    const id = generateUuid();

    await queryRunner.query(`
        INSERT INTO public.user (id, country_id, name, birthdate, type, email, hashed_password)
        VALUES ('${id}', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Admin', '2000-01-01', ${
      UserTypeEnum.Admin
    }, '${adminEmail.toLowerCase()}', '${hashedPassword}');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
      throw new HttpError(
        HttpStatusEnum.InternalServerError,
        ENV_MESSAGES.ERROR.MISSING_ADMIN_EMAIL
      );
    }

    await queryRunner.query(`
      DELETE FROM public.user WHERE email = '${adminEmail.toLowerCase()}';
    `);
  }
}
