import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { CompetitionglobalEntity } from "./competitionglobalEntity";
import { TeamglobalEntity } from "./teamglobalEntity";

@Entity("competitionglobal_teamglobal")
export class CompetitionglobalTeamglobalEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({
    type: "varchar",
    name: "competitionglobal_id",
    nullable: false,
  })
  competitionglobalId: string;

  @Column({
    type: "varchar",
    name: "teamglobal_id",
    nullable: false,
  })
  teamglobalId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(
    () => CompetitionglobalEntity,
    (competitionglobal) => competitionglobal.competitionglobalTeamglobals
  )
  @JoinColumn({ name: "competitionglobal_id", referencedColumnName: "id" })
  competitionglobal?: CompetitionglobalEntity;

  @ManyToOne(
    () => TeamglobalEntity,
    (teamglobal) => teamglobal.competitionglobalTeamglobals
  )
  @JoinColumn({ name: "teamglobal_id", referencedColumnName: "id" })
  teamglobal?: TeamglobalEntity;
}
