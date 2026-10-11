import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Port 3000 matches the origin allowed by the backend's CORS setting
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 }
});
