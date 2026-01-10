import { QueryClient } from "@tanstack/react-query";

/**
 * React Query client with proper defaults
 * All queries and mutations should use hooks that call api-client functions directly
 * 
 * Configuration ensures:
 * - Queries only fetch once on initial load
 * - Subsequent component mounts use cached data
 * - No automatic refetching on mount, window focus, or reconnect
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      refetchOnMount: false, // Don't refetch when component mounts if data exists
      refetchOnReconnect: false, // Don't refetch when network reconnects
      staleTime: Infinity, // Data never becomes stale - only fetch once
      gcTime: 30 * 60 * 1000, // Keep unused data in cache for 30 minutes
      retry: 1, // Retry once on failure
      retryDelay: 1000, // Wait 1 second before retrying
    },
    mutations: {
      retry: false, // Don't retry mutations
    },
  },
});
