export function getTotalVehicles(
  north: number,
  east: number,
  south: number,
  west: number
): number {
  return north + east + south + west;
}

export function getAverageVehicles(
  north: number,
  east: number,
  south: number,
  west: number
): number {
  return (north + east + south + west) / 4;
}
