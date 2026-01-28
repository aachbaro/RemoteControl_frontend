import { useCallback, useState } from "react";
import { captureScreen } from "../api/screen";

export function useScreenshot() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const capture = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const res = await captureScreen();
      setMessage(res.ok ? "Screenshot capturé ✅" : "Échec screenshot ❌");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, message, error, capture };
}
