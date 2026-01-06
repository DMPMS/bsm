import type { PositionType } from "../../types/Position.type";
import styles from "./position.module.css";

const areaClassMap = {
  1: styles.goalkeeper,
  2: styles.defense,
  3: styles.midfield,
  4: styles.attack,
};

interface PositionProps {
  position: PositionType;
}

const Position = ({ position }: PositionProps) => {
  return (
    <span
      title={position.name}
      className={`${styles.span} ${areaClassMap[position.area]}`}
    >
      {position.abbreviation}
    </span>
  );
};

export default Position;
