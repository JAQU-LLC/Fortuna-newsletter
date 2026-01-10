import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@assets": path.resolve(import.meta.dirname, "assets"),
    },
  },
  css: {
    // Tailwind CSS v4 uses its own Vite plugin, no PostCSS config needed
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: false, // Allow fallback to next available port if 5000 is taken
    open: false, // Don't auto-open browser
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
