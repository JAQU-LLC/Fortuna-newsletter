import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { loginApi, logoutApi, getCurrentUserApi } from "@/lib/api-client";
import { UserRole, isAdmin } from "@/models/user";

export interface User {
  id: string;
  username: string;
  role: UserRole;
  authorization_level: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: User;
}

/**
 * Hook for admin login
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  return useMutation<
    LoginResponse,
    Error,
    { username: string; password: string }
  >({
    mutationFn: async ({ username, password }) => {
      return await loginApi(username, password);
    },
    onSuccess: (data) => {
      // Invalidate and refetch current user query
      queryClient.setQueryData(["auth", "me"], data.user);
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      setLocation("/admin/dashboard");
    },
  });
}

/**
 * Hook for admin logout
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      await logoutApi();
    },
    onSuccess: () => {
      // Clear all queries and redirect to login
      queryClient.clear();
      setLocation("/admin");
    },
  });
}

/**
 * Hook to get current authenticated user
 *
 * Note: This query only fetches once on initial load. Subsequent component mounts
 * will use cached data. The query will not refetch automatically.
 */
export function useCurrentUser() {
  return useQuery<User | null, Error>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      try {
        return await getCurrentUserApi();
      } catch (error) {
        // Not authenticated
        return null;
      }
    },
    retry: false,
    staleTime: Infinity, // User info doesn't change often
    refetchOnMount: false, // Don't refetch when component mounts if data exists
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: false, // Don't refetch on reconnect
  });
}

/**
 * Hook to check if current user is admin
 */
export function useIsAdmin() {
  const { data: user } = useCurrentUser();
  return user ? isAdmin(user.role, user.authorization_level) : false;
}
