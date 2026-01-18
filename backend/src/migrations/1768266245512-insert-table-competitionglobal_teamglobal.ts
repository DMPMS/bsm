import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertTableCompetitionglobalTeamglobal1768266245512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO public.competitionglobal_teamglobal(id, competitionglobal_id, teamglobal_id) VALUES
        ('cafd1424-78bb-4ced-93d0-fe8eae1f70d1', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', '72857d4a-d523-4597-b668-58b973ca72d6'),
        ('71dd7853-b3bd-4c2b-bd8a-954e2a2df0b7', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', '905aead9-9d1b-4cf2-8cf3-6ac3bf541362'),
        ('8ff80797-703e-439d-b858-a1e7b12f7c0e', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', '43c5dd6b-4628-4d8a-92fb-cdb8274c99eb'),
        ('4526b0b9-7733-4f15-8c3a-743050fd8cd0', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', '7ea08e7b-5e37-47aa-a3f2-a406adf9fbf2'),
        ('711be530-6860-401b-b234-4ed35e51ceb9', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', '21e65e6e-d6dc-4973-860d-4d64917430a4'),
        ('68ef60ff-29bb-4fff-b476-4c43f0183ca0', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', 'ce6e3274-a81d-4f22-9775-b4ae35509c0a'),
        ('10dfd9e5-8cfb-460d-b8f7-6baaeb04f307', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', '4ce9eb58-dcbf-4978-b1bb-e6c3cefd821f'),
        ('aa731c0a-d640-46e3-9c35-709e0f57f064', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', 'e2742a03-ca20-403b-bd4e-067939f30483'),
        ('f98a2cec-0102-49d0-9d77-76bdfc39e4d6', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', 'dc385d67-0bb9-4f65-95f6-80e6171be935'),
        ('f7e43399-dafb-43ab-9d99-91e8aa14b0d8', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', '4ecf855f-9263-4a4b-8633-4bc6927a38e6'),
        ('47cf2485-bcf1-4a47-8a1e-0839a71a6ac8', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', 'cc40ec88-2049-45c9-b307-11083e5a62a3'),
        ('ef1a69a2-a9b6-4ac2-81e4-7c766a9df107', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', '1c66d60e-2538-4a39-8f59-fb78631780f5'),
        ('5ec61cf4-93a0-4ec0-8b91-d335bf7cd73d', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', '309a838f-b917-465d-ba09-60a2f06aff31'),
        ('30617548-7955-47f0-b2b7-da031904d926', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', '405173c6-dd8d-4196-8fa7-567c17fc9efe'),
        ('d5fce733-bc05-4796-8aba-b7fd4e15137f', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', '6150bdaf-f139-4c85-9ef9-da52345c8803'),
        ('05913e5e-910f-477d-a6ac-75534e1c25a0', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', 'ed5711c4-ade8-48c2-8dac-70bac4bf40ee'),
        ('b88b29a4-83dc-46c8-b7d5-2636f70e6b25', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', 'a82a8e3d-0aa5-4e03-a12e-1bccc50a8d08'),
        ('7fb241cd-08ae-4af1-9e50-34d7bee1c43d', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', '7eccef16-ab8c-4e9e-a911-f610ce8b3e48'),
        ('71422ec0-fe93-4acb-96ad-0694d03e950a', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', '7b08a130-20c5-4c0f-8f9a-5098a63f0a30'),
        ('91ec92b4-5cf5-4d7c-8dcb-9bc53b5cefa3', 'c7e2a8b1-4f3a-4e2b-9c1d-8a2b7e1c2d3f', 'b4d396a1-16b8-43c5-8360-07a0988e77f0'),
        ('5da8cf41-bc5e-4038-aff9-6bf940dfe314', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', '300af59f-1185-4e69-baf9-b9954579236a'),
        ('d1999914-378c-4804-9a47-1559698b0661', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', '8e46e9e1-7227-4e07-98e0-d8d028d8cf3f'),
        ('5dc79fa2-314b-40cc-bfbd-fe9f26a08ea2', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', '253a582a-193b-475c-a347-26f4bd7ab8f0'),
        ('f4290c55-afa5-406d-b300-17b3485fd4da', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', '6f943ef3-cf36-4ee7-89d5-32f2931f436a'),
        ('8221450e-12cf-40d9-b3fe-71b16a563642', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', '8fcdadae-7b7c-4a15-a970-3fff3118f0e6'),
        ('8ef5984c-14d7-4533-9ac4-d3e2ccc0f33d', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', '626763f8-ddec-4f4c-846a-a6bf4a437ef8'),
        ('e26475b8-dfb4-48ff-9bf2-69ccc68f1044', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', 'de2ac1b1-3f85-4321-a942-454ffee6a3c9'),
        ('0460e90d-f087-4cdb-8393-799a7f130ec8', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', 'bed89d9b-b66b-4da7-b488-5634fb817eb5'),
        ('6399815a-d96f-4bed-98fe-4ac9a13fb832', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', '8f20034c-dd5e-416b-9f5c-70c94c9b4c33'),
        ('2137f58c-0175-4ce2-912e-484639506928', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', '5bcabf3c-f6b4-40e8-92e7-75f73f89abd8'),
        ('64d8f4bc-ed62-4076-80c5-db8a1319e309', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', '06c7f60c-5afd-4231-b066-9eba0feb0dd5'),
        ('4bcde6f2-0fc7-48a9-ab11-61fe02c5090a', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', 'faa6c6cd-9026-41a3-88f1-60e6b0c188f1'),
        ('16b74229-60a4-4101-8a88-461f3777b323', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', '466ad309-6cf7-467a-9278-dd8435e01e72'),
        ('b3e55273-672c-4b6b-bbfe-3442797a9c33', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', '49ea07af-6cfd-41a5-9b8b-7cd041c82d24'),
        ('766b32a9-8334-4563-8343-c3e6cc8d75eb', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', '751b9600-f618-4d75-b58d-3c6a9b71d19b'),
        ('461cd26d-8c80-4836-85c6-3a707ec5d1d8', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', '4140aaa5-aae1-4ec7-a5b7-54b017a65bf8'),
        ('cb953203-f161-4fbd-aee0-106d45c30bb9', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', 'a3df211b-6137-4f32-a0b1-a45c7fa51302'),
        ('ff042cd3-5514-46fa-8a3b-2045ce046c82', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', '2221d2d8-be9e-400a-9288-cbce16b7e926'),
        ('003c3f34-a620-4f8b-8a9f-56655fcf26ea', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', '0dafb89d-a11f-405d-87c2-4f359b925add'),
        ('2c3fa287-c4f7-4e3a-bc33-311aa35e7519', 'd2b3e9c4-1a7b-4c8e-9f2a-3b1e7c2d8a4f', '1b98e7f0-7d9d-47d2-9120-3cb9a726ccec'),
        ('1e88e4ed-3583-4ce4-a628-bae6681eea98', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', '8da74f1d-1f6a-4ecb-ac3f-b94247808666'),
        ('3fbce554-395b-4d10-8c43-55b83449dc30', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', '12113c45-e171-4682-801f-734df0805dce'),
        ('3aca784d-b244-41f6-8ff7-79a502f0cfc8', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', '53550c3b-e69d-443b-9c4b-85b963ade2ef'),
        ('080520ab-a692-42c5-831e-a845f208a3f6', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', '392ac08f-56a6-484d-91f2-589e4879d839'),
        ('6a82f2d9-459f-4c10-ad44-59f1cd39a9eb', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', 'd98e5257-d998-4bd6-9567-9529838047b1'),
        ('73c4388a-23c4-472e-aa65-94f092719f4a', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', 'dfb3cf9f-a43a-4a39-ac67-a741eb87c465'),
        ('9f7386b2-4963-44a8-9109-9d918dca0e9e', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', 'c6434304-6a8c-42dd-acd5-fc3a538645ea'),
        ('14e6653f-02e4-47dc-a750-74c006b02f48', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', '0230a86b-ea0f-4207-8864-841ac00a2b28'),
        ('e1ae63a8-d2c5-4cad-a24b-235e88775955', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', '8852b47e-5e56-414b-8850-f0263fb98059'),
        ('96bb95d6-47e6-44bd-a560-7fd3431987f7', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', '73a6de89-8be4-4e03-a707-77690bbdadcb'),
        ('2d17b1b8-30f6-4b88-9e80-c65df460e018', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', 'ce14fea9-eb42-432b-9755-e54971d07b01'),
        ('3f9dbdb4-c56e-4cbe-a1bf-55cfe58e22c3', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', '2c2fb389-1337-4d56-9a19-0f6b896e3890'),
        ('7ae5d43f-d4d7-418a-9b02-b052b86cda73', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', '1709da41-eaf5-4b13-ae02-fd6b8eaef110'),
        ('858152da-616b-4d91-aa45-cc7fd3d5a3f1', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', 'c0fb1328-e291-4aff-a833-ac26cf51c689'),
        ('9e35df0f-51c0-4dbf-9994-8f8a30caa3c2', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', 'af79cd9c-a59b-40a9-aa19-66f040125676'),
        ('9d130cf2-33d9-4a98-93f9-bfae94f19406', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', '3c3f9ec9-e3db-496a-a970-c67c4a491248'),
        ('19a7725b-4fef-4e51-bb98-4f5a982e8d13', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', '3a2e3c33-306b-4760-9b1f-75dd94e619cf'),
        ('5947addf-365f-4ac5-ad23-f35999e4cc58', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', 'b27a06dc-1d4f-431d-ac7e-8a45d3278d64'),
        ('1e74e80a-b2af-4153-b3c7-3cee4f5a7bb5', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', '24520607-23c9-4242-a22c-3b0fcd5444fe'),
        ('2ebdc465-225b-4fa0-bb6d-a2aa540bcb95', 'e1a9c3b7-2d4f-4b8a-9c2e-7a3b1d8e4f2c', '07f08f09-72ef-4476-9650-bb13762d281e'),
        ('d0cfd944-2d98-46c0-b140-6d44032e2834', 'f8c2d1a3-7e4b-4a9c-8b2e-1d3a7c2e9b4f', 'e6a489d6-08f9-462e-9aa7-1fd9211f6678'),
        ('8cce27a7-9aac-44db-9c73-55cb69bd9a60', 'f8c2d1a3-7e4b-4a9c-8b2e-1d3a7c2e9b4f', '1e20cd41-f255-4cd8-b0ae-b87280dc2514'),
        ('f57a5287-a60b-449b-9838-fe697adf8bc4', 'f8c2d1a3-7e4b-4a9c-8b2e-1d3a7c2e9b4f', 'e43961a0-b30e-41fe-ac56-6215953e5d92'),
        ('d5875200-149e-4685-b23b-801643cbd57a', 'f8c2d1a3-7e4b-4a9c-8b2e-1d3a7c2e9b4f', '7c114587-4ea2-4422-968e-e7af02398fbc'),
        ('a5ceb54d-8466-410a-a0b5-b0cf2809ac92', 'f8c2d1a3-7e4b-4a9c-8b2e-1d3a7c2e9b4f', '8b6f82d2-0a46-4bd8-a621-2cf5cc9ef366'),
        ('f6ae717a-5c66-4070-ac85-bdf64d1e49a7', 'f8c2d1a3-7e4b-4a9c-8b2e-1d3a7c2e9b4f', '149e9276-cfa2-48a1-865c-ab49d2347cc1'),
        ('a0c3b791-dae7-4150-b5e2-36bbd97b7a60', 'f8c2d1a3-7e4b-4a9c-8b2e-1d3a7c2e9b4f', '214644fe-bf8a-4764-b8cb-54c236aeeb08'),
        ('c66c6a9b-fee7-4a06-aea8-38e572cee3b7', 'f8c2d1a3-7e4b-4a9c-8b2e-1d3a7c2e9b4f', '6fead172-16ca-421e-8707-d86d4d65b384');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM public.competitionglobal_teamglobal;
    `);
  }
}
