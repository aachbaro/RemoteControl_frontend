import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Charge les variables d’environnement (.env, .env.local, etc.)
  const env = loadEnv(mode, process.cwd());

  const backendTarget = env.VITE_BACKEND_TARGET;

  if (!backendTarget) {
    throw new Error("VITE_BACKEND_TARGET is not defined");
  }
  console.log("Backend target:", backendTarget);

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: backendTarget,
          changeOrigin: true,
        },
      },
    },
  };
});