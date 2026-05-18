import { LineupPresetEnum } from "../../enums/LineupPreset.enum";
import { MouseCursorEnum } from "../../enums/MouseCursor.enum";
import type { IconPropsType } from "../../types/IconProps.type";
import AlphaIcon from "./alpha.icon";
import BetaIcon from "./beta.icon";
import DeltaIcon from "./delta.icon";
import GammaIcon from "./gamma.icon";

interface LineupCardProps extends IconPropsType {
  preset: LineupPresetEnum;
}

const PresetIcon = ({
  preset,
  size,
  circle = false,
  disabled = false,
  color = "var(--color-gray-1)",
  colorHover = "var(--color-gray-2)",
  colorDisabled = "var(--color-gray-1)",
  className = "",
  cursor = MouseCursorEnum.Pointer,
}: LineupCardProps) => {
  let icon = null;

  switch (preset) {
    case LineupPresetEnum.Alpha:
      icon = (
        <AlphaIcon
          size={size}
          circle={circle}
          disabled={disabled}
          color={color}
          colorHover={colorHover}
          colorDisabled={colorDisabled}
          className={className}
          cursor={cursor}
        />
      );
      break;

    case LineupPresetEnum.Beta:
      icon = (
        <BetaIcon
          size={size}
          circle={circle}
          disabled={disabled}
          color={color}
          colorHover={colorHover}
          colorDisabled={colorDisabled}
          className={className}
          cursor={cursor}
        />
      );
      break;

    case LineupPresetEnum.Gamma:
      icon = (
        <GammaIcon
          size={size}
          circle={circle}
          disabled={disabled}
          color={color}
          colorHover={colorHover}
          colorDisabled={colorDisabled}
          className={className}
          cursor={cursor}
        />
      );
      break;

    case LineupPresetEnum.Delta:
      icon = (
        <DeltaIcon
          size={size}
          circle={circle}
          disabled={disabled}
          color={color}
          colorHover={colorHover}
          colorDisabled={colorDisabled}
          className={className}
          cursor={cursor}
        />
      );
      break;
  }

  return icon;
};

export default PresetIcon;
