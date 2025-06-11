import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { COUNTRY } from "../config/constants";
import { UserEntity } from "./userEntity";
import { ManagerglobalEntity } from "./managerglobalEntity";
import { PlayerglobalEntity } from "./playerglobalEntity";
import { TeamglobalEntity } from "./teamglobalEntity";

@Entity("country")
export class CountryEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({
    type: "varchar",
    name: "name",
    length: COUNTRY.NAME.MAX,
    nullable: false,
  })
  name: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => UserEntity, (user) => user.country)
  users?: UserEntity[];

  @OneToMany(
    () => ManagerglobalEntity,
    (managerglobal) => managerglobal.country
  )
  managerglobals?: ManagerglobalEntity[];

  @OneToMany(() => PlayerglobalEntity, (playerglobal) => playerglobal.country)
  playerglobals?: PlayerglobalEntity[];

  @OneToMany(() => TeamglobalEntity, (teamglobal) => teamglobal.country)
  teamglobals?: TeamglobalEntity[];
}
