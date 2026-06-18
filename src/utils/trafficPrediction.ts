export function predictVehicleCount(
  currentCount: number
): number {
  return currentCount + Math.floor(currentCount * 0.2);
}
