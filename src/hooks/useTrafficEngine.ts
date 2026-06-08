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
  };
}
