import { UserEntity } from "../entities/userEntity";
import { ReturnCountryDto } from "./returnCountryDto";

export class ReturnUserDto {
  id: string;
  name: string;
  imageUrl: string | null;
  birthdate: string;
  email: string;

  country?: ReturnCountryDto;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.imageUrl = userEntity.imageUrl;
    this.birthdate = userEntity.birthdate;
    this.email = userEntity.email;

    this.country = userEntity.country
      ? new ReturnCountryDto(userEntity.country)
      : undefined;
  }
}
