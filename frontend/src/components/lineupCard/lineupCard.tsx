import type { LineupFormationEnum } from "../../enums/LineupFormation.enum";
import type { LineupPlayStyleEnum } from "../../enums/LineupPlayStyle.enum";
import { LineupPresetEnum } from "../../enums/LineupPreset.enum";
import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import {
  LineupFormationTextMap,
  LineupPlayStyleTextMap,
} from "../../utils/lineup";
import PresetIcon from "../icons/preset.icon";
import RadioNotSelectedIcon from "../icons/radioNotSelected.icon";
import RadioSelectedIcon from "../icons/radioSelected.icon";
import Spinner from "../spinner/spinner";
import styles from "./lineupCard.module.css";

interface LineupCardProps {
  isActive: boolean;
  preset: LineupPresetEnum;
  formation: LineupFormationEnum;
  playStyle: LineupPlayStyleEnum;
  loadingRequest?: boolean;
  disabled?: boolean;
  handleClickUpdate: (value: LineupPresetEnum) => void;
  className?: string;
}

const LineupCard = ({
  isActive,
  preset,
  formation,
  playStyle,
  loadingRequest = false,
  disabled = false,
  handleClickUpdate,
  className = "",
}: LineupCardProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <h3 className={styles.h3}>{LineupPresetEnum[preset]}</h3>
      <div className={styles.icon}>
        <PresetIcon
          preset={preset}
          size={80}
          cursor={MouseCursorEnum.Auto}
          color={isActive ? "var(--color-blue-1)" : "var(--color-gray-1)"}
          colorHover={isActive ? "var(--color-blue-1)" : "var(--color-gray-1)"}
          colorDisabled={
            isActive ? "var(--color-blue-1)" : "var(--color-gray-1)"
          }
        />
      </div>

      <div className={styles.formation}>
        {LineupFormationTextMap[formation]}
      </div>
      <div className={styles.playStyle}>
        {LineupPlayStyleTextMap[playStyle]}
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.button} ${styles.updateLineupButton}`}
          disabled={true}
        >
          Atualizar
        </button>
        <button
          className={`${styles.button} ${styles.updateActiveLineupButton}`}
          type="button"
          onClick={() => handleClickUpdate(preset)}
          disabled={disabled || isActive}
        >
          <span className={styles.buttonContent}>
            {loadingRequest ? (
              <Spinner size={12} />
            ) : isActive ? (
              <RadioSelectedIcon
                size={20}
                color={"var(--color-white-1)"}
                colorHover={"var(--color-white-1)"}
                colorDisabled={"var(--color-white-1)"}
                disabled={disabled || isActive}
              />
            ) : (
              <RadioNotSelectedIcon
                size={20}
                color={"var(--color-white-1)"}
                colorHover={"var(--color-white-1)"}
                colorDisabled={"var(--color-white-1)"}
                disabled={disabled || isActive}
              />
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default LineupCard;
