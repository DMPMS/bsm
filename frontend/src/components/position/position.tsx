import type { PositionAreaEnum } from "../../enums/PositionArea.enum";
import styles from "./position.module.css";

const areaClassMap = {
  1: styles.goalkeeper,
  2: styles.defense,
  3: styles.midfield,
  4: styles.attack,
};

interface PositionProps {
  abbreviation: string;
  area: PositionAreaEnum;
}

const Position = ({ abbreviation, area }: PositionProps) => {
  return (
    <span className={`${styles.span} ${areaClassMap[area]}`}>
      {abbreviation}
    </span>
  );
};

export default Position;
