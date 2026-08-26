import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // Allows tunnels (ngrok, etc.) to reach the dev server — their Host header
    // won't match "localhost", which Vite 5 blocks by default.
    allowedHosts: true,
  },
});
