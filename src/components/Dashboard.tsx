import { useTrafficEngine } from "../hooks/useTrafficEngine";
import SignalPanel from "./SignalPanel";

export default function Dashboard() {
  const {
    signals,
    allVehicles,
    logs,
    handleInjectVehicle,
    handleOverrideLane,
    triggerGeminiAnalysis,
    saveTrafficMetrics,
  } = useTrafficEngine();

  return (
    <div>
      <h1>AI Traffic Management System</h1>

      <button onClick={() => handleInjectVehicle("North", "car")}>
        Add Car North
      </button>

      <button onClick={() => handleInjectVehicle("East", "ambulance")}>
        Add Ambulance East
      </button>

      <button onClick={() => handleOverrideLane("East")}>
        Force East Green
      </button>

      <button onClick={triggerGeminiAnalysis}>
        Run AI Analysis
      </button>

      <button onClick={saveTrafficMetrics}>
        Save Metrics
      </button>

      <h2>Signals</h2>
      <pre>{JSON.stringify(signals, null, 2)}</pre>

      <h2>Vehicles</h2>
      <pre>{JSON.stringify(allVehicles, null, 2)}</pre>

      <h2>System Logs</h2>
      {logs.map((log) => (
        <p key={log.id}>
          {log.time} - {log.source}: {log.message}
        </p>
      ))}
    </div>
  );
}
<SignalPanel />
