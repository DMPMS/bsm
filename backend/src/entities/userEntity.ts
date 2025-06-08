import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { COUNTRY, USER } from "../config/constants";
import { UserTypeEnum } from "../enums/UserTypeEnum";
import { CountryEntity } from "./countryEntity";

@Entity("user")
export class UserEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({
    type: "varchar",
    name: "country_id",
    nullable: false,
  })
  countryId: string;

  @Column({
    type: "varchar",
    name: "name",
    length: USER.NAME.MAX,
    nullable: false,
  })
  name: string;

  @Column({ type: "text", name: "image_url", nullable: true })
  imageUrl: string | null;

  @Column({ type: "date", name: "birthdate", nullable: false })
  birthdate: string;

  @Column({
    type: "integer",
    name: "type",
    nullable: false,
  })
  type: UserTypeEnum;

  @Column({
    type: "varchar",
    name: "email",
    length: USER.EMAIL.MAX,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: "varchar",
    name: "hashed_password",
    length: USER.HASHED_PASSWORD.MAX,
    nullable: false,
  })
  hashedPassword: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => CountryEntity, (country) => country.users)
  @JoinColumn({ name: "country_id", referencedColumnName: "id" })
  country?: CountryEntity;
}
