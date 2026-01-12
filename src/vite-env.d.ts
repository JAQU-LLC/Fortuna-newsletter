/// <reference types="vite/client" />

/**
 * Type definitions for Vite environment variables
 *
 * Vite only exposes environment variables prefixed with VITE_ to the client
 * for security reasons. This file provides TypeScript type definitions.
 */
interface ImportMetaEnv {
  /**
   * Backend API base URL
   * Leave empty if backend is not yet deployed
   * Example: https://api.fortuna.ai or http://localhost:8000
   */
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
