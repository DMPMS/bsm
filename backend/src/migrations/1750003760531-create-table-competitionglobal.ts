import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableCompetitionglobal1750003760531
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.competitionglobal (
        id UUID,
        rule_id UUID NOT NULL,

        name VARCHAR(30) NOT NULL,
        image_url TEXT,
        season VARCHAR(4) NOT NULL,

        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,

        PRIMARY KEY (id),
        FOREIGN KEY (rule_id) REFERENCES public.rule(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.competitionglobal;
    `);
  }
}
