import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablePlayerglobal1749599031456 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.playerglobal (
        id UUID,
        country_id UUID NOT NULL,
        teamglobal_id UUID,

        name VARCHAR(30) NOT NULL,
        image_url TEXT,
        birthdate DATE NOT NULL,
        overall INTEGER NOT NULL,

        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,

        PRIMARY KEY (id),
        FOREIGN KEY (country_id) REFERENCES public.country(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (teamglobal_id) REFERENCES public.teamglobal(id) ON DELETE SET NULL ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.playerglobal;
    `);
  }
}
