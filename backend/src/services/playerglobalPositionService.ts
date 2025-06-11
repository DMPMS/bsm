import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../config/orm";
import { generateUuid } from "../utils/generateUuid";
import { PlayerglobalService } from "./playerglobalService";
import { PositionService } from "./positionService";
import { PlayerglobalPositionEntity } from "../entities/playerglobalPositionEntity";
import { CreatePlayerglobalPositionDto } from "../dtos/createPlayerglobalPositionDto";

export class PlayerglobalPositionService {
  private readonly playerglobalService: PlayerglobalService;
  private readonly positionService: PositionService;

  constructor(
    private readonly playerglobalPositionRepository: Repository<PlayerglobalPositionEntity> = AppDataSource.getRepository(
      PlayerglobalPositionEntity
    )
  ) {
    this.playerglobalService = new PlayerglobalService();
    this.positionService = new PositionService();
  }

  async createPlayerglobalPosition(
    createPlayerglobalPositionDto: CreatePlayerglobalPositionDto
  ): Promise<PlayerglobalPositionEntity> {
    await this.playerglobalService.getPlayerglobalById(
      createPlayerglobalPositionDto.playerglobalId
    );
    await this.positionService.getPositionById(
      createPlayerglobalPositionDto.positionId
    );

    const savedPlayerglobalPosition =
      await this.playerglobalPositionRepository.save({
        ...createPlayerglobalPositionDto,
        id: generateUuid(),
      });

    return savedPlayerglobalPosition;
  }

  async deletePlayerglobalPosition(
    playerglobalId: string
  ): Promise<DeleteResult> {
    await this.playerglobalService.getPlayerglobalById(playerglobalId);

    return this.playerglobalPositionRepository.delete({
      playerglobalId: playerglobalId,
    });
  }
}
