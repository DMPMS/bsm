import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableTeamglobal1749563973393 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.teamglobal (
        id UUID,
        country_id UUID NOT NULL,
        managerglobal_id UUID NOT NULL,

        name VARCHAR(30) NOT NULL,
        abbreviation VARCHAR(3) NOT NULL,
        image_url TEXT,
        active_lineupglobal_preset INTEGER NOT NULL,

        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,

        PRIMARY KEY (id),
        FOREIGN KEY (country_id) REFERENCES public.country(id) ON DELETE RESTRICT ON UPDATE CASCADE,
        FOREIGN KEY (managerglobal_id) REFERENCES public.managerglobal(id) ON DELETE RESTRICT ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.teamglobal;
    `);
  }
}
