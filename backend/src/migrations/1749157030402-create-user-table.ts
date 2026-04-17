import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1749157030402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.user (
        id UUID,
        country_id UUID NOT NULL,

        name VARCHAR(30) NOT NULL,
        image_url TEXT,
        birthdate DATE NOT NULL,
        type INTEGER NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        hashed_password VARCHAR(60) NOT NULL,

        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,

        PRIMARY KEY (id),
        FOREIGN KEY (country_id) REFERENCES public.country(id) ON DELETE RESTRICT ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.user;
    `);
  }
}
