import { LaneDirection } from "../types";

export function getNextFixedLane(currentLane: LaneDirection): LaneDirection {
  const cycle: LaneDirection[] = ["North", "East", "South", "West"];
  return cycle[(cycle.indexOf(currentLane) + 1) % cycle.length];
}
