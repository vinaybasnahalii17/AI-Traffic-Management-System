import { useState, useRef } from "react";
import {
  Vehicle,
  VehicleType,
  LaneDirection,
  LightState,
  SystemLog,
  PredictionData,
} from "../types";

export function useTrafficEngine() {
  const [controlMode, setControlMode] = useState<"adaptive" | "fixed">("adaptive");
  const [cameraMode, setCameraMode] = useState<"standard" | "yolo" | "canny">("yolo");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const [activePreset, setActivePreset] = useState<string>("Highway Cam-01");
  const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);
  const [activeGreenLane, setActiveGreenLane] = useState<LaneDirection>("North");

  const [geminiPrompt, setGeminiPrompt] = useState<string>(
    "Maximize throughput for high-volume traffic."
  );

  const [isGeminiLoading, setIsGeminiLoading] = useState<boolean>(false);
  const [geminiReport, setGeminiReport] = useState<string>(
    "NeuralTraffic AI Core initialized."
  );

  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [savedRecords, setSavedRecords] = useState<any[]>([]);
  const [isDbSaving, setIsDbSaving] = useState<boolean>(false);

  const [totalVehiclesPassed, setTotalVehiclesPassed] = useState<number>(314);
  const [savingPerformancePct, setSavingPerformancePct] = useState<number>(34.2);

  const nextIdRef = useRef<number>(106);
  
  const addSystemLog = (
    source: string,
    message: string,
    level: "info" | "success" | "warning" | "error" = "info"
  ) => {
    setLogs((prev) => [
      {
        id: Math.random().toString(),
        time: new Date().toLocaleTimeString(),
        source,
        message,
        level,
      },
      ...prev.slice(0, 40),
    ]);
  };

  const getLaneCounts = () => {
    const counts: Record<LaneDirection, number> = {
      North: 0,
      East: 0,
      South: 0,
      West: 0,
    };

    allVehicles.forEach((vehicle) => {
      if (vehicle.position < 0.85) {
        counts[vehicle.lane]++;
      }
    });

    return counts;
  };
  const [signals, setSignals] = useState<
    Record<
      LaneDirection,
      {
        light: LightState;
        timer: number;
        greenDuration: number;
      }
    >
  >({
    North: { light: "green", timer: 14, greenDuration: 45 },
    East: { light: "red", timer: 0, greenDuration: 25 },
    South: { light: "green", timer: 14, greenDuration: 45 },
    West: { light: "red", timer: 0, greenDuration: 30 },
  });

  const handleInjectVehicle = (
    lane: LaneDirection,
    type: VehicleType
  ) => {
    const isEmergency = type === "ambulance" || type === "fire_truck";

    if (
      isEmergency &&
      allVehicles.some((vehicle) => vehicle.lane === lane && vehicle.isEmergency)
    ) {
      addSystemLog(
        "YOLO",
        `Emergency vehicle already exists on ${lane} lane.`,
        "warning"
      );
      return;
    }

    setAllVehicles((prev) => [
      ...prev,
      {
        id: nextIdRef.current++,
        type,
        lane,
        position: 0.02,
        speed: isEmergency ? 0.012 : type === "truck" ? 0.004 : 0.007,
        yOffset: Math.floor(Math.random() * 12) - 6,
        confidence: 0.92,
        isEmergency,
        tracked: true,
      },
    ]);

    addSystemLog(
      "YOLO",
      `Vehicle detected: ${type.toUpperCase()} on ${lane} lane.`,
      "info"
    );
  };
  return {
    controlMode,
    setControlMode,
    cameraMode,
    setCameraMode,
    isPlaying,
    setIsPlaying,
    activePreset,
    setActivePreset,
    allVehicles,
    setAllVehicles,
    activeGreenLane,
    setActiveGreenLane,
    geminiPrompt,
    setGeminiPrompt,
    isGeminiLoading,
    setIsGeminiLoading,
    geminiReport,
    setGeminiReport,
    predictions,
    setPredictions,
    logs,
    setLogs,
    savedRecords,
    setSavedRecords,
    isDbSaving,
    setIsDbSaving,
    totalVehiclesPassed,
    setTotalVehiclesPassed,
    savingPerformancePct,
    setSavingPerformancePct,
    nextIdRef,
    signals,
    setSignals,
    addSystemLog,
    getLaneCounts,
    handleInjectVehicle,
  };
}
