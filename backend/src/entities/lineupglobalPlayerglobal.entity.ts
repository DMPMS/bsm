import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { LineupSpotEnum } from "../enums/LineupSpot.enum";
import { PlayerglobalEntity } from "./playerglobal.entity";
import { LineupglobalEntity } from "./lineupglobal.entity";

@Entity("lineupglobal_playerglobal")
export class LineupglobalPlayerglobalEntity {
  @PrimaryColumn({ type: "uuid", name: "id" })
  id: string;

  @Column({
    type: "uuid",
    name: "lineupglobal_id",
    nullable: false,
  })
  lineupglobalId: string;

  @Column({
    type: "uuid",
    name: "playerglobal_id",
    nullable: false,
  })
  playerglobalId: string;

  @Column({
    type: "integer",
    name: "spot",
    nullable: false,
  })
  spot: LineupSpotEnum;

  @Column({
    type: "boolean",
    name: "is_captain",
    nullable: false,
  })
  isCaptain: boolean;

  @Column({
    type: "boolean",
    name: "is_free_kick_taker",
    nullable: false,
  })
  isFreeKickTaker: boolean;

  @Column({
    type: "boolean",
    name: "is_left_corner_taker",
    nullable: false,
  })
  isLeftCornerTaker: boolean;

  @Column({
    type: "boolean",
    name: "is_right_corner_taker",
    nullable: false,
  })
  isRightCornerTaker: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(
    () => LineupglobalEntity,
    (lineupglobal) => lineupglobal.lineupglobalPlayerglobals,
  )
  @JoinColumn({ name: "lineupglobal_id", referencedColumnName: "id" })
  lineupglobal?: LineupglobalEntity;

  @ManyToOne(
    () => PlayerglobalEntity,
    (playerglobal) => playerglobal.lineupglobalPlayerglobals,
  )
  @JoinColumn({ name: "playerglobal_id", referencedColumnName: "id" })
  playerglobal?: PlayerglobalEntity;
}
