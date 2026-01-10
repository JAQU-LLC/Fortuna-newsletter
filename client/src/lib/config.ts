/**
 * Configuration utilities for environment variables
 * 
 * Vite only exposes environment variables prefixed with VITE_ to the client
 * All environment variables must be accessed through import.meta.env.VITE_*
 */

/**
 * Get the backend API base URL
 * Returns empty string if not set, which means API calls will use relative URLs
 */
export function getApiUrl(): string {
  return import.meta.env.VITE_API_URL || '';
}

/**
 * Get the full API endpoint URL by appending the path to the base URL
 * @param path - API endpoint path (e.g., '/api/auth/login' or 'api/auth/login')
 * @returns Full URL if base URL is set, otherwise returns the path as-is
 */
export function getApiEndpoint(path: string): string {
  const baseUrl = getApiUrl();
  if (!baseUrl) {
    // No base URL set, use relative path
    // Ensure path starts with / for relative URLs
    return path.startsWith('/') ? path : `/${path}`;
  }
  
  // Base URL is set, construct full URL
  const cleanBaseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`; // Ensure path starts with /
  
  return `${cleanBaseUrl}${cleanPath}`;
}

