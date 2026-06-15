import { VehicleType } from "../types";

export function isEmergencyVehicle(type: VehicleType): boolean {
  return type === "ambulance" || type === "fire_truck";
}

export function getVehicleSpeed(type: VehicleType): number {
  if (type === "ambulance" || type === "fire_truck") return 0.012;
  if (type === "truck") return 0.004;
  return 0.007;
}
