import { DeleteResult, EntityManager, Repository } from "typeorm";
import { PlayerglobalService } from "./playerglobal.service";
import { LineupglobalPlayerglobalEntity } from "../entities/lineupglobalPlayerglobal.entity";
import { AppDataSource } from "../config/orm";
import { CreateLineupglobalPlayerglobalDto } from "../dtos/createLineupglobalPlayerglobal.dto";
import { generateUuid } from "../utils/uuid";
import { LineupglobalService } from "./lineupglobal.service";

export class LineupglobalPlayerglobalService {
  private readonly lineupglobalService: LineupglobalService;
  private readonly playerglobalService: PlayerglobalService;

  constructor(
    private readonly lineupglobalPlayerglobalRepository: Repository<LineupglobalPlayerglobalEntity> = AppDataSource.getRepository(
      LineupglobalPlayerglobalEntity,
    ),
  ) {
    this.lineupglobalService = new LineupglobalService();
    this.playerglobalService = new PlayerglobalService();
  }

  async createLineupglobalPlayerglobal(
    createLineupglobalPlayerglobalDto: CreateLineupglobalPlayerglobalDto,
    entityManager?: EntityManager,
  ): Promise<void> {
    const repository = entityManager
      ? entityManager.getRepository(LineupglobalPlayerglobalEntity)
      : this.lineupglobalPlayerglobalRepository;

    await this.lineupglobalService.getLineupglobalById(
      createLineupglobalPlayerglobalDto.lineupglobalId,
      undefined,
      entityManager,
    );

    await this.playerglobalService.getPlayerglobalById(
      createLineupglobalPlayerglobalDto.playerglobalId,
      undefined,
      undefined,
      entityManager,
    );

    await repository.save({
      id: generateUuid(),
      lineupglobalId: createLineupglobalPlayerglobalDto.lineupglobalId,
      playerglobalId: createLineupglobalPlayerglobalDto.playerglobalId,
      spot: createLineupglobalPlayerglobalDto.spot,
      isCaptain: createLineupglobalPlayerglobalDto.isCaptain,
      isFreeKickTaker: createLineupglobalPlayerglobalDto.isFreeKickTaker,
      isLeftCornerTaker: createLineupglobalPlayerglobalDto.isLeftCornerTaker,
      isRightCornerTaker: createLineupglobalPlayerglobalDto.isRightCornerTaker,
    });
  }

  async deleteLineupglobalPlayerglobal(
    lineupglobalId: string,
    entityManager?: EntityManager,
  ): Promise<DeleteResult> {
    const repository = entityManager
      ? entityManager.getRepository(LineupglobalPlayerglobalEntity)
      : this.lineupglobalPlayerglobalRepository;

    await this.lineupglobalService.getLineupglobalById(
      lineupglobalId,
      undefined,
      entityManager,
    );

    return await repository.delete({
      lineupglobalId: lineupglobalId,
    });
  }
}
