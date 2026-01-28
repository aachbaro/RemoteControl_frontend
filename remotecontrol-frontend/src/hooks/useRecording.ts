// remotecontrol-frontend/src/hooks/useRecording.ts

import { useCallback, useEffect, useState } from "react";
import {
  getRecordingStatus,
  startRecording,
  stopRecording,
  type RecordingStatus,
} from "../api/recording";

export function useRecording() {
  const [status, setStatus] = useState<RecordingStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const data = await getRecordingStatus();
      setStatus(data);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  const start = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await startRecording();
      setStatus(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const stop = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await stopRecording();
      setStatus(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { status, loading, error, refresh, start, stop };
}
