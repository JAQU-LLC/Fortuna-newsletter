import { getApiEndpoint } from "./config";
import type { Subscriber } from "@/models/subscriber";
import type { Post } from "@/models/post";
import { createLogger } from "./logger";

// Re-export types for use in hooks
export type { Subscriber, Post };

// Create logger instances for different modules
const log = createLogger("API");

/**
 * Transform backend response `id` field to frontend `_id` for consistency
 */
function transformSubscriber(data: any): Subscriber {
  const planId = data.plan_id;
  const validPlanId: "free" | "standard" | "premium" =
    planId === "free" || planId === "standard" || planId === "premium"
      ? planId
      : "free";

  const transformed = {
    _id: data.id || data._id,
    email: data.email,
    name: data.name || "",
    is_active: data.is_active,
    plan_id: validPlanId,
    subscribed_at: data.subscribed_at,
    unsubscribed_at: data.unsubscribed_at ?? null,
  };
  return transformed;
}

/**
 * Transform backend response for Post
 */
function transformPost(data: any): Post {
  return {
    id: data.id,
    title: data.title,
    content: data.content,
    excerpt: data.excerpt,
    createdAt: data.createdAt || data.created_at,
    published: data.published,
  };
}

/**
 * Get access token from sessionStorage
 */
function getAccessToken(): string | null {
  return sessionStorage.getItem("access_token");
}

/**
 * Get refresh token from localStorage
 */
function getRefreshToken(): string | null {
  return localStorage.getItem("refresh_token");
}

/**
 * Store tokens after login/refresh
 */
function storeTokens(accessToken: string, refreshToken?: string): void {
  sessionStorage.setItem("access_token", accessToken);
  if (refreshToken) {
    localStorage.setItem("refresh_token", refreshToken);
  }
  log.debug("Tokens stored", { hasRefreshToken: !!refreshToken });
}

/**
 * Clear all tokens
 */
function clearTokens(): void {
  sessionStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  log.debug("Tokens cleared");
}

/**
 * Refresh access token using refresh token
 */
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    log.debug("Token refresh skipped: no refresh token");
    return null;
  }

  const endpoint = getApiEndpoint("/auth/refresh");

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      log.error("Token refresh failed", new Error(errorText), {
        status: response.status,
      });
      return null;
    }

    const data = await response.json();
    if (data.access_token) {
      storeTokens(data.access_token);
      log.debug("Token refreshed successfully");
      return data.access_token;
    }
    log.warn("Token refresh: no access_token in response");
    return null;
  } catch (error) {
    log.error("Token refresh exception", error);
    return null;
  }
}

/**
 * API fetch wrapper with automatic auth headers and token refresh
 */
async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = getApiEndpoint(endpoint);
  const accessToken = getAccessToken();

  log.debug("Request", {
    endpoint,
    method: options.method || "GET",
    hasToken: !!accessToken,
  });

  // Prepare headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  // Add Authorization header if token exists
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  // Make initial request
  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers: headers as HeadersInit,
      credentials: "include",
    });
    log.debug("Response", { status: response.status, ok: response.ok });
  } catch (error) {
    // Provide better error messages for network/CORS errors
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      log.error("Network error", error, { url });
      throw new Error(
        `Network error: Unable to connect to backend at ${url}. ` +
          `Please ensure the backend server is running and accessible. ` +
          `If this is a CORS error, check that the Vite proxy is configured correctly.`
      );
    }
    log.error("Fetch error", error, { url });
    throw error;
  }

  // Handle 401 Unauthorized - try to refresh token
  if (response.status === 401 && accessToken) {
    log.debug("401 received, refreshing token");
    const newAccessToken = await refreshAccessToken();

    if (newAccessToken) {
      log.debug("Token refreshed, retrying request");
      headers["Authorization"] = `Bearer ${newAccessToken}`;
      try {
        response = await fetch(url, {
          ...options,
          headers: headers as HeadersInit,
          credentials: "include",
        });
      } catch (error) {
        if (error instanceof TypeError && error.message === "Failed to fetch") {
          log.error("Retry network error", error, { url });
          throw new Error(
            `Network error: Unable to connect to backend at ${url}. ` +
              `Please ensure the backend server is running and accessible.`
          );
        }
        log.error("Retry fetch error", error);
        throw error;
      }
    } else {
      log.error("Token refresh failed, redirecting to login");
      clearTokens();
      if (window.location.pathname !== "/admin") {
        window.location.href = "/admin";
      }
      throw new Error("Authentication failed. Please log in again.");
    }
  }

  return response;
}

// ============= Auth API Functions =============

export async function loginApi(username: string, password: string) {
  const endpoint = "/auth/login";

  try {
    const response = await apiFetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { detail: "Login failed" };
      }
      log.error("Login failed", new Error(errorData.detail || "Login failed"), {
        status: response.status,
      });
      throw new Error(errorData.detail || errorData.message || "Login failed");
    }

    const data = await response.json();

    storeTokens(data.access_token, data.refresh_token);
    log.info("Login successful", { username: data.user?.username });
    return data;
  } catch (error) {
    log.error("Login exception", error);
    throw error;
  }
}

export async function logoutApi(): Promise<void> {
  await apiFetch("/auth/logout", {
    method: "POST",
  });

  clearTokens();
}

export async function getCurrentUserApi() {
  try {
    const response = await apiFetch("/auth/me");

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      log.error("Get current user failed", new Error(errorText), {
        status: response.status,
      });
      throw new Error(
        `Failed to get current user: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    log.error("Get current user exception", error);
    throw error;
  }
}

// ============= Subscribers API Functions =============

export interface ListSubscribersParams {
  skip?: number;
  limit?: number;
  search?: string;
  is_active?: boolean;
  plan_id?: string;
}

export interface ListSubscribersResponse {
  subscribers: Subscriber[];
  total: number;
  page: number;
  limit: number;
}

export async function listSubscribersApi(
  params?: ListSubscribersParams
): Promise<ListSubscribersResponse> {
  const queryParams = new URLSearchParams();
  if (params?.skip !== undefined)
    queryParams.append("skip", params.skip.toString());
  if (params?.limit !== undefined)
    queryParams.append("limit", params.limit.toString());
  if (params?.search) queryParams.append("search", params.search);
  if (params?.is_active !== undefined)
    queryParams.append("is_active", params.is_active.toString());
  if (params?.plan_id) queryParams.append("plan_id", params.plan_id);

  const queryString = queryParams.toString();
  const endpoint = queryString ? `/subscribers?${queryString}` : "/subscribers";

  const response = await apiFetch(endpoint);

  if (!response.ok) {
    throw new Error("Failed to fetch subscribers");
  }

  const data = await response.json();
  return {
    ...data,
    subscribers: data.subscribers.map((sub: any) =>
      transformSubscriber(sub)
    ) as Subscriber[],
  };
}

export async function createSubscriberApi(
  email: string,
  name: string
): Promise<Subscriber> {
  const response = await apiFetch("/subscribers", {
    method: "POST",
    body: JSON.stringify({ email, name }),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ detail: "Failed to create subscriber" }));
    throw new Error(error.detail || "Failed to create subscriber");
  }

  const data = await response.json();
  return transformSubscriber(data);
}

export interface UpdateSubscriberData {
  name?: string;
  is_active?: boolean;
  plan_id?: string;
}

export async function updateSubscriberApi(
  id: string,
  data: UpdateSubscriberData
): Promise<Subscriber> {
  const response = await apiFetch(`/subscribers/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ detail: "Failed to update subscriber" }));
    throw new Error(error.detail || "Failed to update subscriber");
  }

  const responseData = await response.json();
  return transformSubscriber(responseData);
}

export async function deleteSubscriberApi(id: string): Promise<void> {
  const response = await apiFetch(`/subscribers/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete subscriber");
  }
}

// ============= Subscriptions API Functions =============

export interface CreateSubscriptionData {
  email: string;
  name: string;
  plan_id: "free" | "standard" | "premium";
  payment_details?: {
    stripe_token?: string;
  };
}

export interface CreateSubscriptionResponse {
  subscription_id: string;
  status: string;
  plan: string;
  subscriber: Subscriber;
}

export async function createSubscriptionApi(
  data: CreateSubscriptionData
): Promise<CreateSubscriptionResponse> {
  try {
    const response = await apiFetch("/subscriptions", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { detail: "Failed to create subscription" };
      }
      log.error(
        "Subscription failed",
        new Error(errorData.detail || "Failed to create subscription"),
        {
          status: response.status,
          plan: data.plan_id,
        }
      );
      throw new Error(
        errorData.detail || errorData.message || "Failed to create subscription"
      );
    }

    const responseData = await response.json();
    const transformed = {
      ...responseData,
      subscriber: transformSubscriber(responseData.subscriber),
    };

    log.info("Subscription created", {
      plan: responseData.plan,
      email: data.email,
    });
    return transformed;
  } catch (error) {
    log.error("Subscription exception", error);
    throw error;
  }
}

// ============= Posts API Functions =============

export interface ListPostsParams {
  skip?: number;
  limit?: number;
  published?: boolean;
}

export interface ListPostsResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
}

export async function listPostsApi(
  params?: ListPostsParams
): Promise<ListPostsResponse> {
  const queryParams = new URLSearchParams();
  if (params?.skip !== undefined)
    queryParams.append("skip", params.skip.toString());
  if (params?.limit !== undefined)
    queryParams.append("limit", params.limit.toString());
  if (params?.published !== undefined)
    queryParams.append("published", params.published.toString());

  const queryString = queryParams.toString();
  const endpoint = queryString ? `/posts?${queryString}` : "/posts";

  try {
    const response = await apiFetch(endpoint);

    if (!response.ok) {
      let errorText = "";
      try {
        errorText = await response.text();
      } catch (e) {
        // Ignore
      }
      log.error("List posts failed", new Error(errorText), {
        status: response.status,
        params,
      });
      throw new Error(
        `Failed to fetch posts: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data = await response.json();
    const transformed = {
      ...data,
      posts: (data.posts || []).map((post: any) => transformPost(post)),
    };

    log.debug("Posts fetched", {
      total: transformed.total,
      count: transformed.posts.length,
      published: params?.published,
    });
    return transformed;
  } catch (error) {
    log.error("List posts exception", error);
    throw error;
  }
}

export async function getPostApi(id: string): Promise<Post> {
  const response = await apiFetch(`/posts/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Post not found");
    }
    throw new Error("Failed to fetch post");
  }

  const data = await response.json();
  return transformPost(data);
}

export interface CreatePostData {
  title: string;
  content: string;
  published?: boolean;
}

export async function createPostApi(data: CreatePostData): Promise<Post> {
  const response = await apiFetch("/posts", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ detail: "Failed to create post" }));
    throw new Error(error.detail || "Failed to create post");
  }

  const responseData = await response.json();
  return transformPost(responseData);
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  published?: boolean;
}

export async function updatePostApi(
  id: string,
  data: UpdatePostData
): Promise<Post> {
  const response = await apiFetch(`/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ detail: "Failed to update post" }));
    throw new Error(error.detail || "Failed to update post");
  }

  const responseData = await response.json();
  return transformPost(responseData);
}

export async function deletePostApi(id: string): Promise<void> {
  const response = await apiFetch(`/posts/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }
}
