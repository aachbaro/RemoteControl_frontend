type Props = {
  loading: boolean;
  message: string | null;
  error: string | null;
  onCapture: () => void;
};

export function ScreenshotPanel({ loading, message, error, onCapture }: Props) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <button onClick={onCapture} disabled={loading}>
        {loading ? "Screenshot..." : "Screenshot"}
      </button>

      {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}
      {message && <p style={{ marginTop: "0.5rem" }}>{message}</p>}
    </div>
  );
}
