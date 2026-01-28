import { RecordingPanel } from "./components/RecordingPanel";
import { ScreenshotPanel } from "./components/ScreenshotPanel";
import { useRecording } from "./hooks/useRecording";
import { useScreenshot } from "./hooks/useScreenshot";

function App() {
  const { status, loading, error, start, stop } = useRecording();
  const screenshot = useScreenshot();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>RemoteControl Frontend</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <RecordingPanel
        status={status}
        loading={loading}
        onStart={start}
        onStop={stop}
      />

      <ScreenshotPanel
        loading={screenshot.loading}
        message={screenshot.message}
        error={screenshot.error}
        onCapture={screenshot.capture}
      />
    </div>
  );
}

export default App;
