import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1749157030402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.user (
        id VARCHAR(36) NOT NULL CHECK (LENGTH(id) = 36),

        name VARCHAR(30) NOT NULL CHECK (LENGTH(name) >= 4),
        image_url TEXT,
        birthdate DATE NOT NULL,
        type INTEGER NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL CHECK (LENGTH(email) >= 8),
        hashed_password VARCHAR(60) NOT NULL CHECK (LENGTH(hashed_password) = 60),

        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,

        PRIMARY KEY (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.user;
    `);
  }
}
