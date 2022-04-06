import { FoundPattern } from "types/pattern.types";
import { Position } from "types/position.types";

export default function(foundPattern: FoundPattern): Position {
  return {
    x: [foundPattern.x, foundPattern.x + foundPattern.width],
    y: [foundPattern.y, foundPattern.y + foundPattern.height],
  };
}
