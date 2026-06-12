import { useState, useRef, useEffect } from "react";
import {
  Vehicle,
  VehicleType,
  LaneDirection,
  LightState,
  SystemLog,
  PredictionData,
} from "../types";
import {
  trafficApiService,
  LaneStatePayload,
} from "../services/trafficApi";


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
  const handleOverrideLane = (lane: LaneDirection) => {
    setActiveGreenLane(lane);

    setSignals((prev) => {
      const next = { ...prev };

      (Object.keys(next) as LaneDirection[]).forEach((direction) => {
        next[direction].light = direction === lane ? "green" : "red";
        next[direction].timer =
          direction === lane ? next[direction].greenDuration : 0;
      });

      return next;
    });

    addSystemLog(
      "ALGORITHM",
      `Manual override activated for ${lane} lane.`,
      "warning"
    );
  };

const triggerGeminiAnalysis = async () => {
    setIsGeminiLoading(true);

    addSystemLog(
      "GEMINI",
      "Analyzing adaptive traffic signal timing.",
      "info"
    );

    try {
      const counts = getLaneCounts();

      const laneStates: LaneStatePayload[] = (
        ["North", "East", "South", "West"] as LaneDirection[]
      ).map((direction) => ({
        direction,
        light: signals[direction].light,
        vehicleCount: counts[direction],
        density:
          counts[direction] > 4
            ? "HIGH"
            : counts[direction] > 1
            ? "MEDIUM"
            : "LOW",
        densityScore: Math.min(
          100,
          Math.round((counts[direction] / 6) * 100)
        ),
      }));

      const data = await trafficApiService.analyzeTraffic({
        laneStates,
        currentPrompt: geminiPrompt,
        hasEmergency: allVehicles.some((vehicle) => vehicle.isEmergency),
      });

      if (data.reportText) {
        setGeminiReport(data.reportText);
      }

      if (data.predictions) {
        setPredictions(data.predictions);
      }

      if (data.optimizedTimingConfig) {
        setSignals((prev) => {
          const next = { ...prev };

          Object.entries(data.optimizedTimingConfig).forEach(
            ([direction, time]) => {
              if (next[direction as LaneDirection]) {
                next[direction as LaneDirection].greenDuration = time;
              }
            }
          );

          return next;
        });
      }

      setSavingPerformancePct(
        Math.min(60, Math.max(15, 20 + Math.floor(Math.random() * 20)))
      );

      addSystemLog(
        "GEMINI",
        "AI optimized timing configuration received.",
        "success"
      );
    } catch (error: any) {
      addSystemLog(
        "GEMINI",
        `AI analysis failed: ${error.message}`,
        "error"
      );
    } finally {
      setIsGeminiLoading(false);
    }
  };

  const saveTrafficMetrics = async () => {
    setIsDbSaving(true);

    try {
      const counts = getLaneCounts();

      const normalWait = 40;
      const aiWait = Math.round(
        normalWait * (1 - savingPerformancePct / 100)
      );

      const data = await trafficApiService.saveMetrics({
        laneNorthCount: counts.North,
        laneEastCount: counts.East,
        laneSouthCount: counts.South,
        laneWestCount: counts.West,
        normalWait,
        aiWait,
        logStr: `Traffic snapshot saved for preset: ${activePreset}`,
      });

      if (data.success) {
        addSystemLog(
          "DATABASE",
          `Traffic metrics saved successfully. Entry ID: ${data.entry.id}`,
          "success"
        );

        const records = await trafficApiService.fetchHistory();

        if (records.list) {
          setSavedRecords(records.list);
        }
      }
    } catch (error: any) {
      addSystemLog(
        "DATABASE",
        `Database saving failed: ${error.message}`,
        "error"
      );
    } finally {
      setIsDbSaving(false);
    }
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
    handleOverrideLane,
    triggerGeminiAnalysis,
    saveTrafficMetrics,
  };
}
