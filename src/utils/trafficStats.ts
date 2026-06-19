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

export function getBusiestLane(
  counts: Record<string, number>
): string {
  return Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );
}

export default function TrafficStats() {
  return (
    <div>
      <h2>Traffic Statistics</h2>
    </div>
  );
}

export default function TrafficStats() {
  return (
    <div>
      <h2>Traffic Statistics</h2>

      <p>Total Vehicles: 0</p>
    </div>
  );
}


