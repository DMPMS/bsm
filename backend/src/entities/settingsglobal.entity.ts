import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { SeasonOffsetEnum } from "../enums/SeasonOffset.enum";

@Entity("settingsglobal")
export class SettingsglobalEntity {
  @PrimaryColumn({ type: "uuid", name: "id" })
  id: string;

  @Column({
    type: "integer",
    name: "season_offset",
    nullable: false,
  })
  seasonOffset: SeasonOffsetEnum;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
