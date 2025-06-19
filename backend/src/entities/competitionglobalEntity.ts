import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { COMPETITIONGLOBAL } from "../config/constants";
import { RuleEntity } from "./ruleEntity";
import { CompetitionglobalTeamglobalEntity } from "./competitionglobalTeamglobalEntity";

@Entity("competitionglobal")
export class CompetitionglobalEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({
    type: "varchar",
    name: "rule_id",
    nullable: false,
  })
  ruleId: string;

  @Column({
    type: "varchar",
    name: "name",
    length: COMPETITIONGLOBAL.NAME.MAX,
    nullable: false,
  })
  name: string;

  @Column({ type: "text", name: "image_url", nullable: true })
  imageUrl: string | null;

  @Column({
    type: "varchar",
    name: "season",
    length: COMPETITIONGLOBAL.SEASON.MAX,
    nullable: false,
  })
  season: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToOne(() => RuleEntity, (rule) => rule.competitionglobal)
  @JoinColumn({ name: "rule_id", referencedColumnName: "id" })
  rule?: RuleEntity;

  @OneToMany(
    () => CompetitionglobalTeamglobalEntity,
    (competitionglobalTeamglobal) =>
      competitionglobalTeamglobal.competitionglobal
  )
  competitionglobalTeamglobals?: CompetitionglobalTeamglobalEntity[];
}
