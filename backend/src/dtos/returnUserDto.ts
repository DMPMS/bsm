import { UserEntity } from "../entities/userEntity";

export class ReturnUserDto {
  id: string;
  name: string;
  imageUrl: string | null;
  birthdate: string;
  email: string;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.imageUrl = userEntity.imageUrl;
    this.birthdate = userEntity.birthdate;
    this.email = userEntity.email;
  }
}
