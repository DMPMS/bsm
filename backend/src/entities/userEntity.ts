import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { USER } from "../config/constants";
import { UserTypeEnum } from "../enums/UserTypeEnum";

@Entity("user")
export class UserEntity {
  @PrimaryColumn()
  id: string;

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
}
