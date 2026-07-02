## Traffic Control Algorithm

The Traffic Control Algorithm is the core module responsible for managing traffic signals dynamically based on vehicle density and emergency vehicle detection. It replaces traditional fixed-time signal control with adaptive signal timing.

### Algorithm Workflow

1. Initialize the traffic signal states for all four lanes (North, East, South, West).
2. Detect and register incoming vehicles.
3. Store vehicle information such as lane, type, speed, and position.
4. Count the number of vehicles in each lane.
5. Calculate traffic density (Low, Medium, High) for every lane.
6. Check for emergency vehicles (ambulance or fire truck).
7. If an emergency vehicle is detected:
   - Immediately prioritize its lane.
   - Turn that lane's traffic signal to green.
8. Otherwise:
   - Send lane information to the AI analysis module.
   - Receive optimized green signal durations.
9. Update traffic signal timings based on AI recommendations.
10. Record all events in the system log.
11. Save traffic metrics to the backend database.
12. Continuously repeat the process to adapt to changing traffic conditions.

---

## My Contribution

I eveloped the complete **Traffic Control Algorithm** module, which includes:

- Custom React Hook (`useTrafficEngine.ts`)
- Adaptive traffic signal control
- Vehicle injection and management
- Lane vehicle counting
- Traffic density calculation
- Emergency vehicle priority logic
- Manual signal override
- AI analysis integration
- System log generation
- Traffic metrics storage
- Backend API communication using `trafficApi.ts`

---

## Key Functions Implemented

| Function | Description |
|----------|-------------|
| `handleInjectVehicle()` | Adds a new vehicle to the selected lane. |
| `getLaneCounts()` | Counts the number of vehicles in each lane. |
| `handleOverrideLane()` | Allows manual override of traffic signals. |
| `triggerGeminiAnalysis()` | Sends traffic data for AI analysis and receives optimized timings. |
| `saveTrafficMetrics()` | Stores traffic statistics in the backend database. |
| `addSystemLog()` | Records important system events and activities. |

---

##  Algorithm Flow

```
Start
   │
   ▼
Initialize Traffic Signals
   │
   ▼
Add / Detect Vehicles
   │
   ▼
Count Vehicles in Each Lane
   │
   ▼
Calculate Traffic Density
   │
   ▼
Emergency Vehicle Present?
   │
 ┌─Yes──────────────┐
 │                  ▼
 │        Give Green Signal
 │                  │
 └──────────────► Update Signals
                    │
                    ▼
             No Emergency
                    │
                    ▼
          Perform AI Traffic Analysis
                    │
                    ▼
       Receive Optimized Signal Timings
                    │
                    ▼
          Update Traffic Signals
                    │
                    ▼
          Save Traffic Metrics
                    │
                    ▼
              Generate Logs
                    │
                    ▼
                  End
```

---

## Objectives of the Algorithm

- Dynamically control traffic signals.
- Reduce vehicle waiting time.
- Improve traffic flow efficiency.
- Prioritize emergency vehicles.
- Optimize signal timing using AI.
- Record traffic statistics for future analysis.
