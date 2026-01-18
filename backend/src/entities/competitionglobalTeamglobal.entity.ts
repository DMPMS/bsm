import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { CompetitionglobalEntity } from "./competitionglobal.entity";
import { TeamglobalEntity } from "./teamglobal.entity";

@Entity("competitionglobal_teamglobal")
export class CompetitionglobalTeamglobalEntity {
  @PrimaryColumn({ type: "uuid", name: "id" })
  id: string;

  @Column({
    type: "uuid",
    name: "competitionglobal_id",
    nullable: false,
  })
  competitionglobalId: string;

  @Column({
    type: "uuid",
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
    (competitionglobal) => competitionglobal.competitionglobalTeamglobals,
  )
  @JoinColumn({ name: "competitionglobal_id", referencedColumnName: "id" })
  competitionglobal?: CompetitionglobalEntity;

  @ManyToOne(
    () => TeamglobalEntity,
    (teamglobal) => teamglobal.competitionglobalTeamglobals,
  )
  @JoinColumn({ name: "teamglobal_id", referencedColumnName: "id" })
  teamglobal?: TeamglobalEntity;
}
