import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { POSITION } from "../config/constants";
import { PositionAreaEnum } from "../enums/PositionArea.enum";
import { PlayerglobalPositionEntity } from "./playerglobalPosition.entity";

@Entity("position")
export class PositionEntity {
  @PrimaryColumn({ type: "uuid", name: "id" })
  id: string;

  @Column({
    type: "varchar",
    name: "name",
    length: POSITION.NAME.MAX,
    nullable: false,
  })
  name: string;

  @Column({
    type: "varchar",
    name: "abbreviation",
    length: POSITION.ABBREVIATION.MAX,
    nullable: false,
  })
  abbreviation: string;

  @Column({
    type: "integer",
    name: "area",
    nullable: false,
  })
  area: PositionAreaEnum;

  @Column({
    type: "integer",
    name: "code",
    nullable: false,
    unique: true,
  })
  code: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(
    () => PlayerglobalPositionEntity,
    (playerglobalPosition) => playerglobalPosition.position,
  )
  playerglobalPositions?: PlayerglobalPositionEntity[];
}
