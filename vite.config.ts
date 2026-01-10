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
  root: path.resolve(projectRoot, "client"),  // ah we are setting project root here. see if we are allowed to change this.
  build: {
    outDir: path.resolve(projectRoot, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: false, // Allow fallback to next available port if 5000 is taken
    open: false, // Don't auto-open browser
    proxy: {
      // Proxy /api/newsletter/* requests to backend server to avoid CORS issues
      '/api/newsletter': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        // Rewrite is not needed since we're forwarding the full path
      },
    },
    fs: {
      strict: true,
      allow: [
        "..", // Allow access to parent directory (relative to root which is "client")
        path.resolve(projectRoot, "assets"), // Explicitly allow assets directory
        // Note: .env file is in client/ directory, not project root
      ],
      // Note: deny pattern removed to allow .env file reading
      // Static file serving is controlled by what's actually in the public directory
    },
  },
  // When root is set to a subdirectory, Vite reads .env files from the directory containing vite.config.ts by default
  // We explicitly set envDir to the root directory (client/) where .env should be located
  envDir: path.resolve(projectRoot, "client"),
});
