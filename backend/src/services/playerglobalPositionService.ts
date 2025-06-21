import { DeleteResult, EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../config/orm";
import { generateUuid } from "../utils/uuid";
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
    createPlayerglobalPositionDto: CreatePlayerglobalPositionDto,
    entityManager?: EntityManager
  ): Promise<void> {
    const repository = entityManager
      ? entityManager.getRepository(PlayerglobalPositionEntity)
      : this.playerglobalPositionRepository;

    await this.playerglobalService.getPlayerglobalById(
      createPlayerglobalPositionDto.playerglobalId,
      undefined,
      undefined,
      entityManager
    );

    await this.positionService.getPositionById(
      createPlayerglobalPositionDto.positionId
    );

    await repository.save({
      ...createPlayerglobalPositionDto,
      id: generateUuid(),
    });
  }

  async deletePlayerglobalPosition(
    playerglobalId: string,
    entityManager?: EntityManager
  ): Promise<DeleteResult> {
    const repository = entityManager
      ? entityManager.getRepository(PlayerglobalPositionEntity)
      : this.playerglobalPositionRepository;

    await this.playerglobalService.getPlayerglobalById(
      playerglobalId,
      undefined,
      undefined,
      entityManager
    );

    return await repository.delete({
      playerglobalId: playerglobalId,
    });
  }
}
