import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { CountryEntity } from "./country.entity";
import { PLAYERGLOBAL } from "../config/constants";
import { PlayerglobalPositionEntity } from "./playerglobalPosition.entity";
import { TeamglobalEntity } from "./teamglobal.entity";
import { LineupglobalPlayerglobalEntity } from "./lineupglobalPlayerglobal.entity";

@Entity("playerglobal")
export class PlayerglobalEntity {
  @PrimaryColumn({ type: "uuid", name: "id" })
  id: string;

  @Column({
    type: "uuid",
    name: "country_id",
    nullable: false,
  })
  countryId: string;

  @Column({
    type: "uuid",
    name: "teamglobal_id",
    nullable: true,
  })
  teamglobalId: string | null;

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

  @OneToMany(
    () => PlayerglobalPositionEntity,
    (playerglobalPosition) => playerglobalPosition.playerglobal,
  )
  playerglobalPositions?: PlayerglobalPositionEntity[];

  @ManyToOne(() => TeamglobalEntity, (teamglobal) => teamglobal.playerglobals)
  @JoinColumn({ name: "teamglobal_id", referencedColumnName: "id" })
  teamglobal?: TeamglobalEntity;

  @OneToMany(
    () => LineupglobalPlayerglobalEntity,
    (lineupglobalPlayerglobal) => lineupglobalPlayerglobal.playerglobal,
  )
  lineupglobalPlayerglobals?: LineupglobalPlayerglobalEntity[];
}
