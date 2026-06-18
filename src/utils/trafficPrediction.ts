export function predictVehicleCount(
  currentCount: number
): number {
  return currentCount + Math.floor(currentCount * 0.2);
}

export function predictCongestionLevel(
  count: number
): string {
  if (count >= 10) return "HIGH";
  if (count >= 5) return "MEDIUM";
  return "LOW";
}
