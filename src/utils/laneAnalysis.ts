export function calculateLaneLoad(vehicleCount: number): string {
  if (vehicleCount >= 8) return "HIGH";
  if (vehicleCount >= 4) return "MEDIUM";
  return "LOW";
}
