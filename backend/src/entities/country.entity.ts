import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { COUNTRY } from "../config/constants";
import { UserEntity } from "./user.entity";
import { ManagerglobalEntity } from "./managerglobal.entity";
import { PlayerglobalEntity } from "./playerglobal.entity";
import { TeamglobalEntity } from "./teamglobal.entity";
import { RuleEntity } from "./rule.entity";
import { CountryCodeEnum } from "../enums/CountryCode.enum";

@Entity("country")
export class CountryEntity {
  @PrimaryColumn({ type: "uuid", name: "id" })
  id: string;

  @Column({
    type: "varchar",
    name: "name",
    length: COUNTRY.NAME.MAX,
    nullable: false,
  })
  name: string;

  @Column({
    type: "integer",
    name: "code",
    nullable: false,
    unique: true,
  })
  code: CountryCodeEnum;

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

  @OneToMany(() => RuleEntity, (rule) => rule.country)
  rules?: RuleEntity[];
}
