import { PositionEntity } from "../entities/positionEntity";
import { PositionAreaEnum } from "../enums/PositionAreaEnum";

export class ReturnPositionDto {
  id: string;
  name: string;
  abbreviation: string;
  area: PositionAreaEnum;
  displayOrder: number;

  constructor(positionEntity: PositionEntity) {
    this.id = positionEntity.id;
    this.name = positionEntity.name;
    this.abbreviation = positionEntity.abbreviation;
    this.area = positionEntity.area;
    this.displayOrder = positionEntity.displayOrder;
  }
}
