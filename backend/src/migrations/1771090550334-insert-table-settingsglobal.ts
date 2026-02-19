import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertTableSettingsglobal1771090550334 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO public.settingsglobal(id, season_offset) VALUES
        ('0ec7d81b-146a-41e7-9fb1-00850707b083', 0);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM public.settingsglobal;
    `);
  }
}
