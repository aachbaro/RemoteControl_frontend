import type { RecordingStatus } from "../api/recording";

type Props = {
  status: RecordingStatus | null;
  loading: boolean;
  onStart: () => void;
  onStop: () => void;
};

export function RecordingPanel({ status, loading, onStart, onStop }: Props) {
  return (
    <div>
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
        <button onClick={onStart} disabled={loading}>
          Start
        </button>
        <button onClick={onStop} disabled={loading} style={{ marginLeft: "1rem" }}>
          Stop
        </button>
      </div>
    </div>
  );
}