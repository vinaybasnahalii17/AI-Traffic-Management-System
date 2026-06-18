export function hasEmergencyVehicle(
  emergencyCount: number
): boolean {
  return emergencyCount > 0;
}

export function getEmergencyPriorityWeight(): number {
  return 100;
}
