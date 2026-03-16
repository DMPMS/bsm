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
import { LineupPresetEnum } from "../enums/LineupPreset.enum";
import { LineupFormationEnum } from "../enums/LineupFormation.enum";
import { LineupPlayStyleEnum } from "../enums/LineupPlayStyle.enum";
import { LineupMarkingStyleEnum } from "../enums/LineupMarkingStyle.enum";
import { LineupDefenseLineEnum } from "../enums/LineupDefenseLine.enum";
import { LineupIntensityEnum } from "../enums/LineupIntensity.enum";
import { TeamglobalEntity } from "./teamglobal.entity";
import { LineupglobalPlayerglobalEntity } from "./lineupglobalPlayerglobal.entity";

@Entity("lineupglobal")
export class LineupglobalEntity {
  @PrimaryColumn({ type: "uuid", name: "id" })
  id: string;

  @Column({
    type: "uuid",
    name: "teamglobal_id",
    nullable: false,
  })
  teamglobalId: string;

  @Column({
    type: "integer",
    name: "preset",
    nullable: false,
  })
  preset: LineupPresetEnum;

  @Column({
    type: "integer",
    name: "formation",
    nullable: false,
  })
  formation: LineupFormationEnum;

  @Column({
    type: "integer",
    name: "play_style",
    nullable: false,
  })
  playStyle: LineupPlayStyleEnum;

  @Column({
    type: "integer",
    name: "marking_style",
    nullable: false,
  })
  markingStyle: LineupMarkingStyleEnum;

  @Column({
    type: "integer",
    name: "defense_line",
    nullable: false,
  })
  defenseLine: LineupDefenseLineEnum;

  @Column({
    type: "integer",
    name: "intensity",
    nullable: false,
  })
  intensity: LineupIntensityEnum;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => TeamglobalEntity, (teamglobal) => teamglobal.lineupglobals)
  @JoinColumn({ name: "teamglobal_id", referencedColumnName: "id" })
  teamglobal?: TeamglobalEntity;

  @OneToMany(
    () => LineupglobalPlayerglobalEntity,
    (lineupglobalPlayerglobal) => lineupglobalPlayerglobal.lineupglobal,
  )
  lineupglobalPlayerglobals?: LineupglobalPlayerglobalEntity[];
}
