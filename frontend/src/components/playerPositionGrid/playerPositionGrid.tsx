import { PositionCodeEnum } from "../../enums/PositionCode.enum";
import type { PositionType } from "../../types/Position.type";
import { calculateOverallByPosition } from "../../utils/position";
import Position from "../position/position";
import styles from "./playerPositionGrid.module.css";

interface OverallByPositionGridProps {
  overall: number;
  positions: PositionType[];
  primaryPositionIds: string[];
  secondaryPositionIds: string[];
  className?: string;
}

const OverallByPositionGrid = ({
  overall,
  positions,
  primaryPositionIds,
  secondaryPositionIds,
  className = "",
  ...props
}: OverallByPositionGridProps) => {
  "";
  const primaryPositionCodes = positions
    .filter((position) => primaryPositionIds.includes(position.id))
    .map((position) => position.code);

  const secondaryPositionCodes = positions
    .filter((position) => secondaryPositionIds.includes(position.id))
    .map((position) => position.code);

  const attackPositionsGroup = (
    <div className={styles.area}>
      <div
        className={`${styles.position} ${styles.attackPosition} ${styles.lateralPosition}`}
      >
        <span>
          {Math.ceil(
            calculateOverallByPosition(
              overall,
              positions.find(
                (position) => position.code === PositionCodeEnum.LeftWinger,
              )!,
              primaryPositionCodes,
              secondaryPositionCodes,
            ),
          )}
        </span>
        <span>
          <Position
            position={
              positions.find(
                (position) => position.code === PositionCodeEnum.LeftWinger,
              )!
            }
          />
        </span>
      </div>
      <div className={styles.centerPositions}>
        <div className={`${styles.position} ${styles.attackPosition}`}>
          <span>
            {Math.ceil(
              calculateOverallByPosition(
                overall,
                positions.find(
                  (position) => position.code === PositionCodeEnum.Striker,
                )!,
                primaryPositionCodes,
                secondaryPositionCodes,
              ),
            )}
          </span>
          <span>
            <Position
              position={
                positions.find(
                  (position) => position.code === PositionCodeEnum.Striker,
                )!
              }
            />
          </span>
        </div>
        <div className={`${styles.position} ${styles.attackPosition}`}>
          <span>
            {Math.ceil(
              calculateOverallByPosition(
                overall,
                positions.find(
                  (position) =>
                    position.code === PositionCodeEnum.SecondStriker,
                )!,
                primaryPositionCodes,
                secondaryPositionCodes,
              ),
            )}
          </span>
          <span>
            <Position
              position={
                positions.find(
                  (position) =>
                    position.code === PositionCodeEnum.SecondStriker,
                )!
              }
            />
          </span>
        </div>
      </div>
      <div
        className={`${styles.position} ${styles.attackPosition} ${styles.lateralPosition}`}
      >
        <span>
          {Math.ceil(
            calculateOverallByPosition(
              overall,
              positions.find(
                (position) => position.code === PositionCodeEnum.RightWinger,
              )!,
              primaryPositionCodes,
              secondaryPositionCodes,
            ),
          )}
        </span>
        <span>
          <Position
            position={
              positions.find(
                (position) => position.code === PositionCodeEnum.RightWinger,
              )!
            }
          />
        </span>
      </div>
    </div>
  );

  const midfieldPositionsGroup = (
    <div className={styles.area}>
      <div
        className={`${styles.position} ${styles.midfieldPosition} ${styles.lateralPosition}`}
      >
        <span>
          {Math.ceil(
            calculateOverallByPosition(
              overall,
              positions.find(
                (position) => position.code === PositionCodeEnum.LeftMidfielder,
              )!,
              primaryPositionCodes,
              secondaryPositionCodes,
            ),
          )}
        </span>
        <span>
          <Position
            position={
              positions.find(
                (position) => position.code === PositionCodeEnum.LeftMidfielder,
              )!
            }
          />
        </span>
      </div>
      <div className={styles.centerPositions}>
        <div className={`${styles.position} ${styles.midfieldPosition}`}>
          <span>
            {Math.ceil(
              calculateOverallByPosition(
                overall,
                positions.find(
                  (position) =>
                    position.code === PositionCodeEnum.AttackingMidfielder,
                )!,
                primaryPositionCodes,
                secondaryPositionCodes,
              ),
            )}
          </span>
          <span>
            <Position
              position={
                positions.find(
                  (position) =>
                    position.code === PositionCodeEnum.AttackingMidfielder,
                )!
              }
            />
          </span>
        </div>
        <div className={`${styles.position} ${styles.midfieldPosition}`}>
          <span>
            {Math.ceil(
              calculateOverallByPosition(
                overall,
                positions.find(
                  (position) =>
                    position.code === PositionCodeEnum.CentralMidfielder,
                )!,
                primaryPositionCodes,
                secondaryPositionCodes,
              ),
            )}
          </span>
          <span>
            <Position
              position={
                positions.find(
                  (position) =>
                    position.code === PositionCodeEnum.CentralMidfielder,
                )!
              }
            />
          </span>
        </div>
        <div className={`${styles.position} ${styles.midfieldPosition}`}>
          <span>
            {Math.ceil(
              calculateOverallByPosition(
                overall,
                positions.find(
                  (position) =>
                    position.code === PositionCodeEnum.DefensiveMidfielder,
                )!,
                primaryPositionCodes,
                secondaryPositionCodes,
              ),
            )}
          </span>
          <span>
            <Position
              position={
                positions.find(
                  (position) =>
                    position.code === PositionCodeEnum.DefensiveMidfielder,
                )!
              }
            />
          </span>
        </div>
      </div>
      <div
        className={`${styles.position} ${styles.midfieldPosition} ${styles.lateralPosition}`}
      >
        <span>
          {Math.ceil(
            calculateOverallByPosition(
              overall,
              positions.find(
                (position) =>
                  position.code === PositionCodeEnum.RightMidfielder,
              )!,
              primaryPositionCodes,
              secondaryPositionCodes,
            ),
          )}
        </span>
        <span>
          <Position
            position={
              positions.find(
                (position) =>
                  position.code === PositionCodeEnum.RightMidfielder,
              )!
            }
          />
        </span>
      </div>
    </div>
  );

  const defenseAndGoalkeeperPositionsGroup = (
    <div className={styles.area}>
      <div
        className={`${styles.position} ${styles.defensePosition} ${styles.lateralPosition}`}
      >
        <span>
          {Math.ceil(
            calculateOverallByPosition(
              overall,
              positions.find(
                (position) => position.code === PositionCodeEnum.LeftBack,
              )!,
              primaryPositionCodes,
              secondaryPositionCodes,
            ),
          )}
        </span>
        <span>
          <Position
            position={
              positions.find(
                (position) => position.code === PositionCodeEnum.LeftBack,
              )!
            }
          />
        </span>
      </div>
      <div className={styles.centerPositions}>
        <div className={`${styles.position} ${styles.defensePosition}`}>
          <span>
            {Math.ceil(
              calculateOverallByPosition(
                overall,
                positions.find(
                  (position) => position.code === PositionCodeEnum.CenterBack,
                )!,
                primaryPositionCodes,
                secondaryPositionCodes,
              ),
            )}
          </span>
          <span>
            <Position
              position={
                positions.find(
                  (position) => position.code === PositionCodeEnum.CenterBack,
                )!
              }
            />
          </span>
        </div>
        <div className={`${styles.position} ${styles.goalkeeperPosition}`}>
          <span>
            {Math.ceil(
              calculateOverallByPosition(
                overall,
                positions.find(
                  (position) => position.code === PositionCodeEnum.Goalkeeper,
                )!,
                primaryPositionCodes,
                secondaryPositionCodes,
              ),
            )}
          </span>
          <span>
            <Position
              position={
                positions.find(
                  (position) => position.code === PositionCodeEnum.Goalkeeper,
                )!
              }
            />
          </span>
        </div>
      </div>
      <div
        className={`${styles.position} ${styles.defensePosition} ${styles.lateralPosition}`}
      >
        <span>
          {Math.ceil(
            calculateOverallByPosition(
              overall,
              positions.find(
                (position) => position.code === PositionCodeEnum.RightBack,
              )!,
              primaryPositionCodes,
              secondaryPositionCodes,
            ),
          )}
        </span>
        <span>
          <Position
            position={
              positions.find(
                (position) => position.code === PositionCodeEnum.RightBack,
              )!
            }
          />
        </span>
      </div>
    </div>
  );

  return (
    <div className={className} {...props}>
      {attackPositionsGroup}
      {midfieldPositionsGroup}
      {defenseAndGoalkeeperPositionsGroup}
    </div>
  );
};

export default OverallByPositionGrid;
