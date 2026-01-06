import type { PositionType } from "../../types/Position.type";
import Position from "../position/position";
import styles from "./positionLabel.module.css";

interface PositionLabelProps {
  position: PositionType;
}

const PositionLabel = ({ position }: PositionLabelProps) => {
  return (
    <div className={styles.positionLabel}>
      <Position position={position} />
      {position.name}
    </div>
  );
};

export default PositionLabel;
