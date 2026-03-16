import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableLineupglobal1773655830283 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.lineupglobal (
        id UUID,
        teamglobal_id UUID NOT NULL,

        preset INTEGER NOT NULL,
        formation INTEGER NOT NULL,
        play_style INTEGER NOT NULL,
        marking_style INTEGER NOT NULL,
        defense_line INTEGER NOT NULL,
        intensity INTEGER NOT NULL,

        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,

        PRIMARY KEY (id),
        FOREIGN KEY (teamglobal_id) REFERENCES public.teamglobal(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.lineupglobal;
    `);
  }
}
