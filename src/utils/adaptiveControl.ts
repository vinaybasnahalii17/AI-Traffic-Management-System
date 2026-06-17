import { LaneDirection } from "../types";

export function getMostCrowdedLane(
  counts: Record<LaneDirection, number>,
  currentLane: LaneDirection
): LaneDirection {
  let selectedLane: LaneDirection = currentLane;
  let maxCount = -1;

  (Object.keys(counts) as LaneDirection[]).forEach((lane) => {
    if (lane !== currentLane && counts[lane] > maxCount) {
      maxCount = counts[lane];
      selectedLane = lane;
    }
  });

  return selectedLane;
}
