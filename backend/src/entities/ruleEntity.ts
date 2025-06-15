import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { RULE } from "../config/constants";
import { CountryEntity } from "./countryEntity";

@Entity("rule")
export class RuleEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({
    type: "varchar",
    name: "name",
    length: RULE.NAME.MAX,
    nullable: false,
  })
  name: string;

  @Column({
    type: "integer",
    name: "number_of_teams",
    nullable: false,
  })
  numberOfTeams: number;

  @Column({ type: "text", name: "description", nullable: true })
  description: string | null;

  @Column({
    type: "varchar",
    name: "default_competition_name",
    length: RULE.DEFAULT_COMPETITION_NAME.MAX,
    nullable: false,
  })
  defaultCompetitionName: string;

  @Column({
    type: "text",
    name: "default_competition_image_url",
    nullable: true,
  })
  defaultCompetitionImageUrl: string | null;

  @Column({
    type: "integer",
    name: "display_order",
    nullable: false,
  })
  displayOrder: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => CountryEntity, (country) => country.rules)
  @JoinColumn({ name: "country_id", referencedColumnName: "id" })
  country?: CountryEntity;
}
