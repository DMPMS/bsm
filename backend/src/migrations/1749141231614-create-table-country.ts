import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableCountry1749141231614 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.country (
        id VARCHAR(36) NOT NULL CHECK (LENGTH(id) = 36),

        name VARCHAR(30) NOT NULL,

        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,

        PRIMARY KEY (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.country;
    `);
  }
}
