import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablePlayerglobal1749599031456
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.playerglobal (
        id VARCHAR(36) NOT NULL CHECK (LENGTH(id) = 36),
        country_id VARCHAR(36) NOT NULL CHECK (LENGTH(country_id) = 36),
        teamglobal_id VARCHAR(36) CHECK (LENGTH(teamglobal_id) = 36),

        name VARCHAR(30) NOT NULL CHECK (LENGTH(name) >= 4),
        image_url TEXT,
        birthdate DATE NOT NULL,
        overall INTEGER NOT NULL CHECK (overall BETWEEN 1 AND 100),

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
