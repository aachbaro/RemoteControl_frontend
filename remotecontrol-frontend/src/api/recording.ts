// remotecontrol-frontend/src/api/recording.ts

import { apiFetch } from "./client";

export type RecordingStatus = {
  is_recording: boolean;
  started_at: string | null;
};

export function getRecordingStatus() {
  return apiFetch<RecordingStatus>("/api/record/status/");
}

export function startRecording() {
  return apiFetch<RecordingStatus>("/api/record/start/", {
    method: "POST",
  });
}

export function stopRecording() {
  return apiFetch<RecordingStatus>("/api/record/stop/", {
    method: "POST",
  });
}
