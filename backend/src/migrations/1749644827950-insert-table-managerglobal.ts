import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertTableManagerglobal1749444827950
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO public.managerglobal(id, country_id, name, image_url, birthdate) VALUES
        ('dd95c964-e791-4680-ad4c-0edc97ef4173', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Cuca', NULL, '1963-06-07'),
        ('72a36615-b4fa-4a2a-97d9-ca7162cd9f38', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Rogério Ceni', NULL, '1973-01-22'),
        ('bd3e526e-6cac-45c4-b9b2-d6201467ba71', '6c8019fd-6af6-4462-8160-3426a69d41f8', 'Renato Paiva', NULL, '1970-03-22'),
        ('795d9fe8-5fd6-4a32-aa3a-2a9d1299e403', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Fernando Seabra', NULL, '1977-06-19'),
        ('067f4e5d-bba2-4a21-9f63-46e5313edce3', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Léo Condé', NULL, '1978-04-21'),
        ('9f3f995a-9a67-42dc-b3d5-bdce630bec18', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Dorival Júnior', NULL, '1962-04-25'),
        ('18bd9de5-d89a-417a-adb1-87fa3f072757', '424068af-7116-4b6c-ac54-e3556a98c178', 'Leonardo Jardim', NULL, '1974-08-01'),
        ('6f2ed666-00c0-489c-a615-b04d87dcb21e', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Filipe Luís', NULL, '1985-08-09'),
        ('44a2a232-375e-4b22-ba5f-9aa99d6c0161', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Renato Gaúcho', NULL, '1962-09-09'),
        ('b4def83a-9481-410c-93b1-412f45930092', 'a7564db9-fe63-4008-8ead-1d49ab06fedb', 'Juan Pablo Vojvoda', NULL, '1975-05-13'),
        ('7cef7275-aa50-4493-8e1c-702c7d682885', 'a7564db9-fe63-4008-8ead-1d49ab06fedb', 'Gustavo Quinteros', NULL, '1965-02-15'),
        ('5c2b9776-4bc9-4655-a38b-b6c871822ca5', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Roger Machado', NULL, '1975-04-25'),
        ('0a6826fc-84e1-4074-bdaf-fc33e25f850a', '6c8019fd-6af6-4462-8160-3426a69d41f8', 'Abel Ferreira', NULL, '1978-12-22'),
        ('d737ff0d-ed36-43cf-ba24-1c4a498d5cd0', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Cléber Xavier', NULL, '1964-03-29'),
        ('4074a68a-db10-4394-a86d-df59fae02247', 'a7564db9-fe63-4008-8ead-1d49ab06fedb', 'Luis Zubeldía', NULL, '1981-01-13'),
        ('169e8063-b603-4be5-a408-2c0104e6dad6', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Daniel Paulista', NULL, '1982-05-05'),
        ('2f10515f-3632-422f-952f-aae32a964894', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Fernando Diniz', NULL, '1974-03-27'),
        ('f3d7ff85-579d-478a-aa3d-5cd72203ad6e', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Thiago Carpini', NULL, '1984-07-16'),
        ('e8fdb405-35ca-4663-8ca4-1c750f0dc2fa', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Rafael Guanaes', NULL, '1981-03-27'),
        ('b6fd351f-199a-48fa-8c67-77feb627d9af', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Claudio Tencati', NULL, '1973-12-05'),
        ('b4804596-26e7-4539-a9bf-6bd1f0f6549c', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Guilherme Alves', NULL, '1974-05-08'),
        ('9e42adad-27ae-4ca0-8be3-3064001da44d', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'William Batista', NULL, '1993-05-13'),
        ('9d6b2205-b4bd-44b0-9461-2dc684a5a9c3', '6c8019fd-6af6-4462-8160-3426a69d41f8', 'Rui Duarte', NULL, '1978-09-16'),
        ('59f40bad-586b-4a20-8fa8-af9fccba66f0', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Odair Hellmann', NULL, '1977-01-22'),
        ('0e99b881-9299-4a81-a889-3de56f626dc5', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Fábio Matias', NULL, '1979-09-25'),
        ('f545fdf7-d684-490b-8299-0eb8a73571dc', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Jair Ventura', NULL, '1979-03-19'),
        ('0dfc3b57-57dd-49b1-a648-b7e344fa9ea0', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Márcio Zanardi', NULL, '1978-07-11'),
        ('feedd161-4b05-4a44-ad2a-8ae3c679003b', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Gilmar Dal Pozzo', NULL, '1969-09-01'),
        ('876e0a9d-f1ea-4540-8745-4287b4fbe4ab', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Mozart Santos', NULL, '1979-11-08'),
        ('30ec8cf0-377d-42f9-9330-f804c50e0616', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Eduardo Barroca', NULL, '1982-04-22'),
        ('7c4d6beb-9602-4c0b-9ccc-b73673b7b865', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Eduardo Baptista', NULL, '1970-03-30'),
        ('d45aa53c-84f9-4f5c-818c-0595a31bbb36', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Guto Ferreira', NULL, '1965-09-07'),
        ('442baddb-d216-493e-83ef-9fa4fdcfbb8a', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Vinicius Bergantin', NULL, '1980-07-31'),
        ('cf4e11e6-5b71-4bc7-ba37-42eda0fe4b8b', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Vagner Mancini', NULL, '1966-10-24'),
        ('876398b6-e91e-4041-80fa-15868d12087c', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Umberto Louzer', NULL, '1980-02-24'),
        ('f99bebeb-4331-4ccf-8c44-d4697819be71', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Bruno Piveti', NULL, '1984-02-19'),
        ('fdfb5ba3-32fe-420b-b7a3-a314fdc60e86', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Claudinei Oliveira', NULL, '1969-09-29'),
        ('a5e9d0ff-f649-453f-9432-0d16414233fc', '6c8019fd-6af6-4462-8160-3426a69d41f8', 'António Oliveira', NULL, '1982-10-09'),
        ('ce2448dd-7e09-4fdd-9b98-2cc72c84afd9', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Rafael Lacerda', NULL, '1984-06-12'),
        ('bb9fbb70-d5ef-4a4e-9348-3bc63bc41135', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Rogério Corrêa', NULL, '1981-03-27'),
        ('1c1a84c9-523d-4e4d-b5cc-104c0c43e4cd', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Evaristo Piza', NULL, '1972-07-27'),
        ('a2b605ff-d579-4c4a-b2b3-705a71064e4b', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Ângelo Luiz', NULL, '1971-11-30'),
        ('4b9312f3-ee94-4220-bccc-83621dfe7d2a', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Márcio Fernandes', NULL, '1962-03-24'),
        ('c1b37947-f29b-40bb-b1fe-879c522c08e1', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Filipe Gouveia', NULL, '1973-05-12'),
        ('0c543215-69e9-42e7-a773-0f7807691257', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Júnior Rocha', NULL, '1981-04-21'),
        ('02842dc6-cf8b-4366-8a3c-ed0bbc523469', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Luizinho Vieira', NULL, '1972-02-04'),
        ('fc9167bf-8b16-4960-94f9-e0973a044b3f', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Higo Magalhães', NULL, '1982-04-06'),
        ('0e0ab865-c07c-4675-a989-274ba0063b3d', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Pintado', NULL, '1965-09-17'),
        ('563baaa8-eec5-4b8c-8c3d-2e8e724b9287', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Leston Júnior', NULL, '1978-10-20'),
        ('2fc446d4-5446-438d-bead-be256062e536', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Marcelo Fernandes', NULL, '1971-04-20'),
        ('f8a39ae5-6fcb-4ae3-a0ff-8fdbb07fbdc4', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Roberto Cavalo', NULL, '1963-04-13'),
        ('7bb303c1-b517-4f12-a1b9-7d65a8c43b70', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Mazola Júnior', NULL, '1965-02-28'),
        ('f660aed2-b9f5-4e1f-85c6-7ddc2bdff7c5', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Roger Silva', NULL, '1985-01-07'),
        ('6572f86c-b19d-42ea-b4c3-11409d1d26b5', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Jorge Castilho', NULL, '1982-04-06'),
        ('08a4e57c-a736-4de2-a041-986513d06258', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Hélio dos Anjos', NULL, '1958-03-07'),
        ('f832d676-d6c1-41de-8fa1-e25e3790034a', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Alberto Valentim', NULL, '1975-03-22'),
        ('3334ea00-a23c-4fbc-93e4-2b6933b8e313', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Wíres', NULL, '1982-12-30'),
        ('9fad14ef-3953-4be9-9ea7-34dbe2ce3d72', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Ricardo Catalá', NULL, '1982-04-28'),
        ('a5f1703a-3049-453b-a9f5-590d1d27c9b9', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Raul Cabral', NULL, '1981-10-06'),
        ('fe31c00b-3e82-487e-a77d-3e2f66f785a1', '4b7569fc-0f7b-4419-9a44-09e859c15dc8', 'Matheus Costa', NULL, '1987-01-14');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM public.managerglobal;
    `);
  }
}
