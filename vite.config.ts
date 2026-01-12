import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory where vite.config.ts is located (project root)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname);
const clientRoot = path.resolve(projectRoot, "client");
const assetsPath = path.resolve(projectRoot, "assets");

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Alias @ to point to client/src (absolute path for reliability)
      "@": path.resolve(clientRoot, "src"),
      "@assets": assetsPath,
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  css: {
    // Tailwind CSS v4 uses its own Vite plugin, no PostCSS config needed
  },
  root: clientRoot, // Vite root is set to client directory
  build: {
    outDir: path.resolve(projectRoot, "dist/public"),
    emptyOutDir: true,
  },
  // Note: Aliases are resolved relative to the root (client/), so @ points to client/src
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
  // envDir: Where Vite looks for .env files
  // Since root is set to client/, and .env is in client/, we set envDir to clientRoot
  // This ensures .env files are loaded correctly even when root is a subdirectory
  envDir: clientRoot,
});
