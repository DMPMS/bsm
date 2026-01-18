import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableCompetitionglobalTeamglobal1750018346731 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.competitionglobal_teamglobal (
        id UUID,
        competitionglobal_id UUID NOT NULL,
        teamglobal_id UUID NOT NULL,

        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,

        PRIMARY KEY (id),
        FOREIGN KEY (competitionglobal_id) REFERENCES public.competitionglobal(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (teamglobal_id) REFERENCES public.teamglobal(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.competitionglobal_teamglobal;
    `);
  }
}
