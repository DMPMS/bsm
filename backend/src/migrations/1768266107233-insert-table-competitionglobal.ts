import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertTableCompetitionglobal1768266107233 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO public.competitionglobal(id, rule_id, name, image_url) VALUES
        ('c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', 'ab73b643-2b87-4fa1-b313-4013044aa1d8', 'Brasileirão Série A', 'https://i.ibb.co/chR1c0W6/brazil-league-a.png'),
        ('d2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', '152b6688-77f3-4eb2-b4b1-e66d73001f67', 'Brasileirão Série B', 'https://i.ibb.co/Kc4RSSNV/brazil-league-b.png'),
        ('e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', 'ac8b5e22-6cfc-4d78-9c28-310f32b81873', 'Brasileirão Série C', 'https://i.ibb.co/8gKr3kwJ/brazil-league-c.png'),
        ('f8c2d1a3-7e4b-4a9c-8b2e-1d3a7c2e9b4f', '9a3e8793-f05b-4ba1-9bbc-59278e36db62', 'Brasileirão Série D', 'https://i.ibb.co/93htsJMB/brazil-league-d.png');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM public.competitionglobal;
    `);
  }
}
