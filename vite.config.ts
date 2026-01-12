import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory where vite.config.ts is located (project root)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname);
const assetsPath = path.resolve(projectRoot, "assets");

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Alias @ to point to src directory
      "@": path.resolve(projectRoot, "src"),
      "@assets": assetsPath,
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: false, // Allow fallback to next available port if 5000 is taken
    open: false, // Don't auto-open browser
    proxy: {
      // Proxy /api/newsletter/* requests to backend server to avoid CORS issues
      "/api/newsletter": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
