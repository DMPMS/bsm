import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableLineupglobalPlayerglobal1773655872893 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.lineupglobal_playerglobal (
        id UUID,
        lineupglobal_id UUID NOT NULL,
        playerglobal_id UUID NOT NULL,

        spot INTEGER NOT NULL,
        is_captain BOOLEAN NOT NULL,
        is_free_kick_taker BOOLEAN NOT NULL,
        is_left_corner_taker BOOLEAN NOT NULL,
        is_right_corner_taker BOOLEAN NOT NULL,

        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,

        PRIMARY KEY (id),
        FOREIGN KEY (lineupglobal_id) REFERENCES public.lineupglobal(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (playerglobal_id) REFERENCES public.playerglobal(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.lineupglobal_playerglobal;
    `);
  }
}
