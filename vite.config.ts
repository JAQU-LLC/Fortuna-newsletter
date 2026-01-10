import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const projectRoot = import.meta.dirname;
const assetsPath = path.resolve(projectRoot, "assets");

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(projectRoot, "client", "src"),
      "@assets": assetsPath,
    },
  },
  css: {
    // Tailwind CSS v4 uses its own Vite plugin, no PostCSS config needed
  },
  root: path.resolve(projectRoot, "client"),
  build: {
    outDir: path.resolve(projectRoot, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: false, // Allow fallback to next available port if 5000 is taken
    open: false, // Don't auto-open browser
    fs: {
      strict: true,
      allow: [
        "..", // Allow access to parent directory (relative to root which is "client")
        path.resolve(projectRoot, "assets"), // Explicitly allow assets directory
      ],
      deny: ["**/.*"],
    },
  },
});
