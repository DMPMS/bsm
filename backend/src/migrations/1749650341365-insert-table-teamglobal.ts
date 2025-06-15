import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertTableTeamglobal1749650341365 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO public.teamglobal(id, country_id, managerglobal_id, name, abbreviation, image_url) VALUES
        ('72857d4a-d523-4597-b668-58b973ca72d6', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'dd95c964-e791-4680-ad4c-0edc97ef4173', 'Atlético - MG', 'CAM', 'https://i.ibb.co/MF1L5Wg/atletico-mg-bra.png'),
        ('905aead9-9d1b-4cf2-8cf3-6ac3bf541362', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '72a36615-b4fa-4a2a-97d9-ca7162cd9f38', 'Bahia', 'BAH', 'https://i.ibb.co/vvLKQbm4/bahia-ba-bra.png'),
        ('43c5dd6b-4628-4d8a-92fb-cdb8274c99eb', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'bd3e526e-6cac-45c4-b9b2-d6201467ba71', 'Botafogo', 'BOT', 'https://i.ibb.co/QtbrM5w/botafogo-rj-bra.png'),
        ('7ea08e7b-5e37-47aa-a3f2-a406adf9fbf2', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '795d9fe8-5fd6-4a32-aa3a-2a9d1299e403', 'Red Bull Bragantino', 'RBB', 'https://i.ibb.co/cKbVV8zC/bragantino-sp-bra.png'),
        ('21e65e6e-d6dc-4973-860d-4d64917430a4', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '067f4e5d-bba2-4a21-9f63-46e5313edce3', 'Ceará', 'CEA', 'https://i.ibb.co/8nfWZK5v/ceara-ce-bra.png'),
        ('ce6e3274-a81d-4f22-9775-b4ae35509c0a', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '9f3f995a-9a67-42dc-b3d5-bdce630bec18', 'Corinthians', 'COR', 'https://i.ibb.co/G4BwQN6K/corinthians-sp-bra.png'),
        ('4ce9eb58-dcbf-4978-b1bb-e6c3cefd821f', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '18bd9de5-d89a-417a-adb1-87fa3f072757', 'Cruzeiro', 'CRU', 'https://i.ibb.co/d4F0XTKV/cruzeiro-mg-bra.png'),
        ('e2742a03-ca20-403b-bd4e-067939f30483', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '6f2ed666-00c0-489c-a615-b04d87dcb21e', 'Flamengo', 'FLA', 'https://i.ibb.co/0yK21xmM/flamengo-rj-bra.png'),
        ('dc385d67-0bb9-4f65-95f6-80e6171be935', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '44a2a232-375e-4b22-ba5f-9aa99d6c0161', 'Fluminense', 'FLU', 'https://i.ibb.co/qKBNN4B/fluminense-sp-bra.png'),
        ('4ecf855f-9263-4a4b-8633-4bc6927a38e6', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'b4def83a-9481-410c-93b1-412f45930092', 'Fortaleza', 'FOR', 'https://i.ibb.co/XxxxkkXz/fortaleza-ce-bra.png'),
        ('cc40ec88-2049-45c9-b307-11083e5a62a3', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '7cef7275-aa50-4493-8e1c-702c7d682885', 'Grêmio', 'GRE', 'https://i.ibb.co/gbzsx4B7/gremio-rs-bra.png'),
        ('1c66d60e-2538-4a39-8f59-fb78631780f5', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '5c2b9776-4bc9-4655-a38b-b6c871822ca5', 'Internacional', 'INT', 'https://i.ibb.co/20R4rgcX/internacional-rs-bra.png'),
        ('309a838f-b917-465d-ba09-60a2f06aff31', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '0a6826fc-84e1-4074-bdaf-fc33e25f850a', 'Palmeiras', 'PAL', 'https://i.ibb.co/p6Cvt78x/palmeiras-sp-bra.png'),
        ('405173c6-dd8d-4196-8fa7-567c17fc9efe', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'd737ff0d-ed36-43cf-ba24-1c4a498d5cd0', 'Santos', 'SAN', 'https://i.ibb.co/LXwqws4W/santos-sp-bra.png'),
        ('6150bdaf-f139-4c85-9ef9-da52345c8803', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '4074a68a-db10-4394-a86d-df59fae02247', 'São Paulo', 'SAO', 'https://i.ibb.co/CFFZZ8b/sao-paulo-sp-bra.png'),
        ('ed5711c4-ade8-48c2-8dac-70bac4bf40ee', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '169e8063-b603-4be5-a408-2c0104e6dad6', 'Sport', 'SPO', 'https://i.ibb.co/Qvfmv98Q/sport-pe-bra.png'),
        ('a82a8e3d-0aa5-4e03-a12e-1bccc50a8d08', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '2f10515f-3632-422f-952f-aae32a964894', 'Vasco', 'VAS', 'https://i.ibb.co/MDtHYM2H/vasco-rj-bra.png'),
        ('7eccef16-ab8c-4e9e-a911-f610ce8b3e48', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'f3d7ff85-579d-478a-aa3d-5cd72203ad6e', 'Vitória', 'VIT', 'https://i.ibb.co/BHgs7gfS/vitoria-ba-bra.png'),
        ('7b08a130-20c5-4c0f-8f9a-5098a63f0a30', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'e8fdb405-35ca-4663-8ca4-1c750f0dc2fa', 'Mirassol', 'MIR', 'https://i.ibb.co/B5D1QtPf/mirassol-sp-bra.png'),
        ('b4d396a1-16b8-43c5-8360-07a0988e77f0', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'b6fd351f-199a-48fa-8c67-77feb627d9af', 'Juventude', 'JUV', 'https://i.ibb.co/gL6bKfLp/juventude-rs-bra.png'),
        ('300af59f-1185-4e69-baf9-b9954579236a', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'b4804596-26e7-4539-a9bf-6bd1f0f6549c', 'Amazonas', 'AMA', 'https://i.ibb.co/QjxhSqwc/amazonas-am-bra.png'),
        ('8e46e9e1-7227-4e07-98e0-d8d028d8cf3f', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '9e42adad-27ae-4ca0-8be3-3064001da44d', 'América - MG', 'AME', 'https://i.ibb.co/Rmw6BRM/america-mg-bra.png'),
        ('253a582a-193b-475c-a347-26f4bd7ab8f0', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '9d6b2205-b4bd-44b0-9461-2dc684a5a9c3', 'Athletic Club', 'ACM', 'https://i.ibb.co/24T86B2/athletic-mg-bra.png'),
        ('6f943ef3-cf36-4ee7-89d5-32f2931f436a', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '59f40bad-586b-4a20-8fa8-af9fccba66f0', 'Athletico - PR', 'CAP', 'https://i.ibb.co/HDNDRw5V/athletico-pr-bra.png'),
        ('8fcdadae-7b7c-4a15-a970-3fff3118f0e6', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '0e99b881-9299-4a81-a889-3de56f626dc5', 'Atlético - GO', 'ACG', 'https://i.ibb.co/7d96PK1k/atletico-go-bra.png'),
        ('626763f8-ddec-4f4c-846a-a6bf4a437ef8', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'f545fdf7-d684-490b-8299-0eb8a73571dc', 'Avaí', 'AVA', 'https://i.ibb.co/R4jCPf3W/avai-sc-bra.png'),
        ('de2ac1b1-3f85-4321-a942-454ffee6a3c9', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '0dfc3b57-57dd-49b1-a648-b7e344fa9ea0', 'Botafogo - SP', 'BOT', 'https://i.ibb.co/PZ1pV2tK/botafogo-sp-bra.png'),
        ('bed89d9b-b66b-4da7-b488-5634fb817eb5', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'feedd161-4b05-4a44-ad2a-8ae3c679003b', 'Chapecoense', 'CHA', 'https://i.ibb.co/fGvv8LF7/chapecoense-sc-bra.png'),
        ('8f20034c-dd5e-416b-9f5c-70c94c9b4c33', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '876e0a9d-f1ea-4540-8745-4287b4fbe4ab', 'Coritiba', 'CTB', 'https://i.ibb.co/LdV9R68D/coritiba-pr-bra.png'),
        ('5bcabf3c-f6b4-40e8-92e7-75f73f89abd8', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '30ec8cf0-377d-42f9-9330-f804c50e0616', 'CRB - AL', 'CRB', 'https://i.ibb.co/sp7HkQrz/crb-al-bra.png'),
        ('06c7f60c-5afd-4231-b066-9eba0feb0dd5', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '7c4d6beb-9602-4c0b-9ccc-b73673b7b865', 'Criciúma', 'CRI', 'https://i.ibb.co/4wCvK1WX/criciuma-sc-bra.png'),
        ('faa6c6cd-9026-41a3-88f1-60e6b0c188f1', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'd45aa53c-84f9-4f5c-818c-0595a31bbb36', 'Cuiabá', 'CUI', 'https://i.ibb.co/gLKDB5bd/cuiaba-mt-bra.png'),
        ('466ad309-6cf7-467a-9278-dd8435e01e72', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '442baddb-d216-493e-83ef-9fa4fdcfbb8a', 'Ferroviária', 'AFE', 'https://i.ibb.co/0jHLh9Mn/ferroviaria-sp-bra.png'),
        ('49ea07af-6cfd-41a5-9b8b-7cd041c82d24', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'cf4e11e6-5b71-4bc7-ba37-42eda0fe4b8b', 'Goiás', 'GOI', 'https://i.ibb.co/fdPkpWSn/goias-go-bra.png'),
        ('751b9600-f618-4d75-b58d-3c6a9b71d19b', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '876398b6-e91e-4041-80fa-15868d12087c', 'Novorizontino', 'NOV', 'https://i.ibb.co/V08kvwS9/novorizontino-sp-bra.png'),
        ('4140aaa5-aae1-4ec7-a5b7-54b017a65bf8', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'f99bebeb-4331-4ccf-8c44-d4697819be71', 'Operário - PR', 'OPE', 'https://i.ibb.co/5x6jJhY2/operario-pr-bra.png'),
        ('a3df211b-6137-4f32-a0b1-a45c7fa51302', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'fdfb5ba3-32fe-420b-b7a3-a314fdc60e86', 'Paysandu', 'PAY', 'https://i.ibb.co/zW3fcGmW/paysandu-pa-bra.png'),
        ('2221d2d8-be9e-400a-9288-cbce16b7e926', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'a5e9d0ff-f649-453f-9432-0d16414233fc', 'Remo', 'REM', 'https://i.ibb.co/wZZcw7TB/remo-pa-bra.png'),
        ('0dafb89d-a11f-405d-87c2-4f359b925add', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'ce2448dd-7e09-4fdd-9b98-2cc72c84afd9', 'Vila Nova', 'VNO', 'https://i.ibb.co/jvBRkbGN/vila-nova-go-bra.png'),
        ('1b98e7f0-7d9d-47d2-9120-3cb9a726ccec', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'bb9fbb70-d5ef-4a4e-9348-3bc63bc41135', 'Volta Redonda', 'VRE', 'https://i.ibb.co/XRsJMg1/volta-redonda-rj-bra.png'),
        ('8da74f1d-1f6a-4ecb-ac3f-b94247808666', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '1c1a84c9-523d-4e4d-b5cc-104c0c43e4cd', 'ABC - RN', 'ABC', 'https://i.ibb.co/FLZsVrxK/abc-rn-bra.png'),
        ('12113c45-e171-4682-801f-734df0805dce', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'a2b605ff-d579-4c4a-b2b3-705a71064e4b', 'Anápolis - GO', 'ANA', 'https://i.ibb.co/nMsZ0Sd0/anapolis-go-bra.png'),
        ('53550c3b-e69d-443b-9c4b-85b963ade2ef', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '4b9312f3-ee94-4220-bccc-83621dfe7d2a', 'Botafogo - PB', 'BOT', 'https://i.ibb.co/Z6Cy0VCG/botafogo-pb-bra.png'),
        ('392ac08f-56a6-484d-91f2-589e4879d839', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'c1b37947-f29b-40bb-b1fe-879c522c08e1', 'Brusque', 'BRU', 'https://i.ibb.co/wh7rwN0D/brusque-sc-bra.png'),
        ('d98e5257-d998-4bd6-9567-9529838047b1', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '0c543215-69e9-42e7-a773-0f7807691257', 'Caxias', 'CAX', 'https://i.ibb.co/1JvBkMTw/caxias-rs-bra.png'),
        ('dfb3cf9f-a43a-4a39-ac67-a741eb87c465', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '02842dc6-cf8b-4366-8a3c-ed0bbc523469', 'Confiança', 'CON', 'https://i.ibb.co/3yHYGW1H/confianca-se-bra.png'),
        ('c6434304-6a8c-42dd-acd5-fc3a538645ea', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'fc9167bf-8b16-4960-94f9-e0973a044b3f', 'CSA - AL', 'CSA', 'https://i.ibb.co/6RX0rmrp/csa-al-bra.png'),
        ('0230a86b-ea0f-4207-8864-841ac00a2b28', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '0e0ab865-c07c-4675-a989-274ba0063b3d', 'Figueirense', 'FIG', 'https://i.ibb.co/dqxBVCd/figueirense-sc-bra.png'),
        ('8852b47e-5e56-414b-8850-f0263fb98059', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '563baaa8-eec5-4b8c-8c3d-2e8e724b9287', 'Floresta', 'FLO', 'https://i.ibb.co/b5pNqVWx/floresta-ce-bra.png'),
        ('73a6de89-8be4-4e03-a707-77690bbdadcb', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '2fc446d4-5446-438d-bead-be256062e536', 'Guarani', 'GUA', 'https://i.ibb.co/NnZFJgVT/guarani-sp-bra.png'),
        ('ce14fea9-eb42-432b-9755-e54971d07b01', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'f8a39ae5-6fcb-4ae3-a0ff-8fdbb07fbdc4', 'Itabaiana', 'ITA', 'https://i.ibb.co/HDfjRwRT/itabaiana-se-bra.png'),
        ('2c2fb389-1337-4d56-9a19-0f6b896e3890', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '7bb303c1-b517-4f12-a1b9-7d65a8c43b70', 'Ituano', 'ITU', 'https://i.ibb.co/LXyN2nQT/ituano-sp-bra.png'),
        ('1709da41-eaf5-4b13-ae02-fd6b8eaef110', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'f660aed2-b9f5-4e1f-85c6-7ddc2bdff7c5', 'Londrina', 'LON', 'https://i.ibb.co/ycwsMrQ2/londrina-sc-bra.png'),
        ('c0fb1328-e291-4aff-a833-ac26cf51c689', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '6572f86c-b19d-42ea-b4c3-11409d1d26b5', 'Maringá', 'MAR', 'https://i.ibb.co/TMFXVrVj/maringa-pr-bra.png'),
        ('af79cd9c-a59b-40a9-aa19-66f040125676', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '08a4e57c-a736-4de2-a041-986513d06258', 'Náutico', 'NAU', 'https://i.ibb.co/TBRj86K8/nautico-pe-bra.png'),
        ('3c3f9ec9-e3db-496a-a970-c67c4a491248', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'f832d676-d6c1-41de-8fa1-e25e3790034a', 'Ponte Preta', 'PON', 'https://i.ibb.co/svk1QJZs/ponte-preta-sp-bra.png'),
        ('3a2e3c33-306b-4760-9b1f-75dd94e619cf', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '3334ea00-a23c-4fbc-93e4-2b6933b8e313', 'Retrô', 'RET', 'https://i.ibb.co/XxNzJDrB/retro-pe-bra.png'),
        ('b27a06dc-1d4f-431d-ac7e-8a45d3278d64', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', '9fad14ef-3953-4be9-9ea7-34dbe2ce3d72', 'São Bernardo', 'SBR', 'https://i.ibb.co/Gv7x88Ly/sao-bernardo-sp-bra.png'),
        ('24520607-23c9-4242-a22c-3b0fcd5444fe', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'a5f1703a-3049-453b-a9f5-590d1d27c9b9', 'Tombense', 'TOM', 'https://i.ibb.co/mk7cd3L/tombense-mg-bra.png'),
        ('07f08f09-72ef-4476-9650-bb13762d281e', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'fe31c00b-3e82-487e-a77d-3e2f66f785a1', 'Ypiranga', 'YPI', 'https://i.ibb.co/VYLv8gjF/ypiranga-rs-bra.png');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM public.teamglobal;
    `);
  }
}
