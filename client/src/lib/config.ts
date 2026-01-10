import { createLogger } from './logger';

const log = createLogger('Config');

/**
 * Configuration utilities for environment variables
 * 
 * Vite only exposes environment variables prefixed with VITE_ to the client
 * All environment variables must be accessed through import.meta.env.VITE_*
 */

/**
 * Get the backend API base URL
 * Returns empty string if not set, which means API calls will use relative URLs
 * In development, we use relative URLs which go through Vite proxy (no CORS issues)
 * In production, use VITE_API_URL if set
 */
export function getApiUrl(): string {
  // In development mode, use relative URLs (they'll be proxied by Vite)
  // In production, use VITE_API_URL if set
  const isDev = import.meta.env.DEV;
  const apiUrl = isDev ? '' : (import.meta.env.VITE_API_URL || '');
  
  log.debug('API URL configured', { isDev, hasApiUrl: !!apiUrl });
  return apiUrl;
}

/**
 * Get the full API endpoint URL by appending the path to the base URL
 * Automatically prepends /api/newsletter prefix to all endpoints
 * @param path - API endpoint path (e.g., '/auth/login' or 'auth/login')
 * @returns Full URL if base URL is set, otherwise returns the path with /api/newsletter prefix
 */
export function getApiEndpoint(path: string): string {
  // Remove leading slash if present, we'll add it consistently
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Prepend /api/newsletter prefix
  const fullPath = `/api/newsletter/${cleanPath}`;
  
  const baseUrl = getApiUrl();
  
  if (!baseUrl) {
    // No base URL set, use relative path with /api/newsletter prefix
    return fullPath;
  }
  
  // Base URL is set, construct full URL
  const cleanBaseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
  const finalUrl = `${cleanBaseUrl}${fullPath}`;
  
  return finalUrl;
}

