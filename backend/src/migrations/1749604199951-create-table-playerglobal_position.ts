import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablePlayerglobalPosition1749604199951 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.playerglobal_position (
        id UUID,
        playerglobal_id UUID NOT NULL,
        position_id UUID NOT NULL,

        is_primary BOOLEAN NOT NULL,

        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,

        PRIMARY KEY (id),
        FOREIGN KEY (playerglobal_id) REFERENCES public.playerglobal(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (position_id) REFERENCES public.position(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.playerglobal_position;
    `);
  }
}
