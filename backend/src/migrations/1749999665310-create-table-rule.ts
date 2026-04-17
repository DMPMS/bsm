import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableRule1749999665310 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.rule (
        id UUID,
        country_id UUID NOT NULL,

        name VARCHAR(30) NOT NULL,
        number_of_teams INTEGER NOT NULL,
        description TEXT NOT NULL,
        default_competition_name VARCHAR(30) NOT NULL,
        default_competition_image_url TEXT,
        code INTEGER UNIQUE NOT NULL,

        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,

        PRIMARY KEY (id),
        FOREIGN KEY (country_id) REFERENCES public.country(id) ON DELETE RESTRICT ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.rule;
    `);
  }
}
