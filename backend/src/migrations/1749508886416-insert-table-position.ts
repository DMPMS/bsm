import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertTablePosition1749508886416 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO public.position(id, name, abbreviation, area, code) VALUES
        ('18764397-9670-43c1-92ae-1e3404ac76a3', 'Goleiro', 'GL', 1, 1),
        ('691d1eb3-3dfe-4fa5-bac1-31ad59912349', 'Zagueiro', 'ZG', 2, 2),
        ('e1f5e721-3138-4b45-a466-a85852be6155', 'Lateral Esquerdo', 'LE', 2, 3),
        ('11e396d5-3450-44c1-8fea-fe43db0f3523', 'Lateral Direito', 'LD', 2, 4),
        ('3752dc46-b4e7-4b14-bf01-ee7f4d7971d3', 'Volante', 'VL', 3, 5),
        ('913d872c-c3c6-4f31-9776-3fbc2fd586ad', 'Meio-campista Central', 'MC', 3, 6),
        ('bc711354-c771-4768-9266-ecf7ced1fd55', 'Meio-campista Esquerdo', 'ME', 3, 7),
        ('6a5a6b27-bc91-467f-a566-d9d25de1f548', 'Meio-campista Direito', 'MD', 3, 8),
        ('df138f39-5fee-426e-9878-65c593a3da51', 'Meio-campista Avançado', 'MA', 3, 9),
        ('e0d9c2ba-f75e-4b85-982a-5dc0159722da', 'Ponta Esquerdo', 'PE', 4, 10),
        ('05e27557-d9f7-4362-93eb-130e65b10505', 'Ponta Direito', 'PD', 4, 11),
        ('e35a3254-b2e4-4414-8e74-3bb9a25514ee', 'Segundo Atacante', 'SA', 4, 12),
        ('a275dec8-e9ef-48a8-9293-2eba90440c2f', 'Centroavante', 'CA', 4, 13);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM public.position;
    `);
  }
}
