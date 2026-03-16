import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { LineupSpotEnum } from "../enums/LineupSpot.enum";

@ValidatorConstraint({ name: "isLineupSpotPlayers", async: false })
export class IsLineupSpotPlayers implements ValidatorConstraintInterface {
  validate(array: any[]) {
    if (!Array.isArray(array)) {
      return false;
    }

    const requiredSpots = new Set<number>(
      Object.values(LineupSpotEnum).filter(
        (value) => typeof value === "number",
      ),
    );
    const spots = new Set<number>();
    const playerIds = new Set<string>();

    for (const item of array) {
      if (!item || typeof item !== "object") {
        return false;
      }

      if (playerIds.has(item.playerId) || spots.has(item.spot)) {
        return false;
      }

      spots.add(item.spot);
      playerIds.add(item.playerId);
    }

    if (spots.size !== requiredSpots.size) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `The array ${args.property} must contain all spots from 1 to 11 (without repetition) and no duplicate playerId`;
  }
}
