import { apiFetch } from "./client";

export type ScreenCaptureResponse = {
  ok: boolean;
  path?: string;
  created_at?: string;
};

export function captureScreen() {
  return apiFetch<ScreenCaptureResponse>("/api/screen/capture/", {
    method: "POST",
  });
}