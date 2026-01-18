import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { CountryEntity } from "./country.entity";
import { TEAMGLOBAL } from "../config/constants";
import { ManagerglobalEntity } from "./managerglobal.entity";
import { PlayerglobalEntity } from "./playerglobal.entity";
import { CompetitionglobalTeamglobalEntity } from "./competitionglobalTeamglobal.entity";

@Entity("teamglobal")
export class TeamglobalEntity {
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
    name: "managerglobal_id",
    nullable: false,
  })
  managerglobalId: string;

  @Column({
    type: "varchar",
    name: "name",
    length: TEAMGLOBAL.NAME.MAX,
    nullable: false,
  })
  name: string;

  @Column({
    type: "varchar",
    name: "abbreviation",
    length: TEAMGLOBAL.ABBREVIATION.MAX,
    nullable: false,
  })
  abbreviation: string;

  @Column({ type: "text", name: "image_url", nullable: true })
  imageUrl: string | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => CountryEntity, (country) => country.teamglobals)
  @JoinColumn({ name: "country_id", referencedColumnName: "id" })
  country?: CountryEntity;

  @OneToOne(
    () => ManagerglobalEntity,
    (managerglobal) => managerglobal.teamglobal,
  )
  @JoinColumn({ name: "managerglobal_id", referencedColumnName: "id" })
  managerglobal?: ManagerglobalEntity;

  @OneToMany(
    () => PlayerglobalEntity,
    (playerglobal) => playerglobal.teamglobal,
  )
  playerglobals?: PlayerglobalEntity[];

  @OneToMany(
    () => CompetitionglobalTeamglobalEntity,
    (competitionglobalTeamglobal) => competitionglobalTeamglobal.teamglobal,
  )
  competitionglobalTeamglobals?: CompetitionglobalTeamglobalEntity[];
}
