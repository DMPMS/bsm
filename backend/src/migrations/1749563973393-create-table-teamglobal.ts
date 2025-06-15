import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableTeamglobal1749563973393 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.teamglobal (
        id VARCHAR(36) NOT NULL CHECK (LENGTH(id) = 36),
        country_id VARCHAR(36) NOT NULL CHECK (LENGTH(country_id) = 36),
        managerglobal_id VARCHAR(36) NOT NULL CHECK (LENGTH(managerglobal_id) = 36),

        name VARCHAR(30) NOT NULL,
        abbreviation VARCHAR(3) NOT NULL,
        image_url TEXT,

        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,

        PRIMARY KEY (id),
        FOREIGN KEY (country_id) REFERENCES public.country(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (managerglobal_id) REFERENCES public.managerglobal(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.teamglobal;
    `);
  }
}
