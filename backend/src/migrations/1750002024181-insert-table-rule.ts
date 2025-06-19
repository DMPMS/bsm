import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertTableRule1750002024181 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO public.rule(id, country_id, name, number_of_teams, default_competition_name, default_competition_image_url, code, description) VALUES
        ('ab73b643-2b87-4fa1-b313-4013044aa1d8', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Campeonato Brasileiro Série A', 20, 'Brasileirão Série A', 'https://i.ibb.co/KxTcfhsN/brazil-league-a.png', 1, 'A definir.'),
        ('152b6688-77f3-4eb2-b4b1-e66d73001f67', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Campeonato Brasileiro Série B', 20, 'Brasileirão Série B', 'https://i.ibb.co/RGY5TdwD/brazil-league-b.png', 2, 'A definir.'),
        ('ac8b5e22-6cfc-4d78-9c28-310f32b81873', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Campeonato Brasileiro Série C', 20, 'Brasileirão Série C', 'https://i.ibb.co/606b7xZn/brazil-league-c.png', 3, 'A definir.'),
        ('9a3e8793-f05b-4ba1-9bbc-59278e36db62', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Campeonato Brasileiro Série D', 8, 'Brasileirão Série D', 'https://i.ibb.co/spWBJqnZ/brazil-league-d.png', 4, 'A definir.');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM public.rule;
    `);
  }
}
