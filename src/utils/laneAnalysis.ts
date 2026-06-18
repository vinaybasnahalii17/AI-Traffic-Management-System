export function calculateLaneLoad(vehicleCount: number): string {
  if (vehicleCount >= 8) return "HIGH";
  if (vehicleCount >= 4) return "MEDIUM";
  return "LOW";
}

export function calculateDensityPercentage(vehicleCount: number): number {
  return Math.min(100, Math.round((vehicleCount / 10) * 100));
}}
