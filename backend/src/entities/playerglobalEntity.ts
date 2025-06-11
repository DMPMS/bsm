import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { CountryEntity } from "./countryEntity";
import { PLAYERGLOBAL } from "../config/constants";

@Entity("playerglobal")
export class PlayerglobalEntity {
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
    length: PLAYERGLOBAL.NAME.MAX,
    nullable: false,
  })
  name: string;

  @Column({ type: "text", name: "image_url", nullable: true })
  imageUrl: string | null;

  @Column({ type: "date", name: "birthdate", nullable: false })
  birthdate: string;

  @Column({
    type: "integer",
    name: "overall",
    nullable: false,
  })
  overall: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => CountryEntity, (country) => country.playerglobals)
  @JoinColumn({ name: "country_id", referencedColumnName: "id" })
  country?: CountryEntity;
}
