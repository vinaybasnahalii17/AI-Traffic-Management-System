export type VehicleType = "car" | "truck" | "bike" | "ambulance" | "fire_truck";

export type LaneDirection = "North" | "East" | "South" | "West";

export type LightState = "red" | "yellow" | "green";

export interface Vehicle {
	id: number;
	type: vehicleType;
	lane: LaneDirection;
	position: number;
	speed: number;
	yOffset: number;
	confidence: number;
	isEmergency: boolean;
	tracked: boolean;
}

export interface SystemLog {
	id: string;
	time: string;
	source: string;
	message: string;
	level: "info" | "success" | "warning" |"error";
}
export interface PredictionDate {
	lane: LaneDirection;
	predictionCount: number;
	congestionLevel: string;
}

