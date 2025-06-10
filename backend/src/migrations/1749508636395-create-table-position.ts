import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablePosition1749508636395 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.position (
        id VARCHAR(36) NOT NULL CHECK (LENGTH(id) = 36),

        name VARCHAR(30) NOT NULL,
        abbreviation VARCHAR(3) NOT NULL,
        area INTEGER NOT NULL,
        display_order INTEGER NOT NULL,

        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,

        PRIMARY KEY (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.position;
    `);
  }
}
