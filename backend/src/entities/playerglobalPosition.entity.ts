import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { PlayerglobalEntity } from "./playerglobal.entity";
import { PositionEntity } from "./position.entity";

@Entity("playerglobal_position")
export class PlayerglobalPositionEntity {
  @PrimaryColumn({ type: "uuid", name: "id" })
  id: string;

  @Column({
    type: "uuid",
    name: "playerglobal_id",
    nullable: false,
  })
  playerglobalId: string;

  @Column({
    type: "uuid",
    name: "position_id",
    nullable: false,
  })
  positionId: string;

  @Column({
    type: "boolean",
    name: "is_primary",
    nullable: false,
  })
  isPrimary: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(
    () => PlayerglobalEntity,
    (playerglobal) => playerglobal.playerglobalPositions
  )
  @JoinColumn({ name: "playerglobal_id", referencedColumnName: "id" })
  playerglobal?: PlayerglobalEntity;

  @ManyToOne(() => PositionEntity, (position) => position.playerglobalPositions)
  @JoinColumn({ name: "position_id", referencedColumnName: "id" })
  position?: PositionEntity;
}
