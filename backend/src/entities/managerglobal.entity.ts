import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { MANAGERGLOBAL } from "../config/constants";
import { CountryEntity } from "./country.entity";
import { TeamglobalEntity } from "./teamglobal.entity";

@Entity("managerglobal")
export class ManagerglobalEntity {
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
    length: MANAGERGLOBAL.NAME.MAX,
    nullable: false,
  })
  name: string;

  @Column({ type: "text", name: "image_url", nullable: true })
  imageUrl: string | null;

  @Column({ type: "date", name: "birthdate", nullable: false })
  birthdate: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => CountryEntity, (country) => country.managerglobals)
  @JoinColumn({ name: "country_id", referencedColumnName: "id" })
  country?: CountryEntity;

  @OneToOne(() => TeamglobalEntity, (teamglobal) => teamglobal.managerglobal)
  teamglobal?: TeamglobalEntity;
}
