import type { PlayerglobalType } from "./Playerglobal.type";
import type { PositionType } from "./Position.type";

export interface PlayerglobalPositionType {
  id: string;
  isPrimary: boolean;

  playerglobal?: PlayerglobalType;
  position?: PositionType;
}
