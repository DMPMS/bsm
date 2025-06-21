import { PositionEntity } from "../entities/position.entity";
import { PositionAreaEnum } from "../enums/PositionArea.enum";

export class ReturnPositionDto {
  id: string;
  name: string;
  abbreviation: string;
  area: PositionAreaEnum;
  code: number;

  constructor(positionEntity: PositionEntity) {
    this.id = positionEntity.id;
    this.name = positionEntity.name;
    this.abbreviation = positionEntity.abbreviation;
    this.area = positionEntity.area;
    this.code = positionEntity.code;
  }
}
