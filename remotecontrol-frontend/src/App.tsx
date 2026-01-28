// remotecontrol-frontend/src/App.tsx

import { useEffect, useState } from "react";
import {
  getRecordingStatus,
  startRecording,
  stopRecording,
  type RecordingStatus,
} from "./api/recording";

function App() {
  const [status, setStatus] = useState<RecordingStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshStatus() {
    try {
      setError(null);
      const data = await getRecordingStatus();
      setStatus(data);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function handleStart() {
    try {
      setLoading(true);
      const data = await startRecording();
      setStatus(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStop() {
    try {
      setLoading(true);
      const data = await stopRecording();
      setStatus(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshStatus();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>RemoteControl Frontend</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {status ? (
        <div>
          <p>
            <strong>Status :</strong>{" "}
            {status.is_recording ? "Recording" : "Stopped"}
          </p>
          <p>
            <strong>Started at :</strong> {status.started_at ?? "—"}
          </p>
        </div>
      ) : (
        <p>Loading status…</p>
      )}

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleStart} disabled={loading}>
          Start
        </button>
        <button
          onClick={handleStop}
          disabled={loading}
          style={{ marginLeft: "1rem" }}
        >
          Stop
        </button>
      </div>
    </div>
  );
}

export default App;
