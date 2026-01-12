import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  listPostsApi,
  getPostApi,
  createPostApi,
  updatePostApi,
  deletePostApi,
  ListPostsResponse,
  CreatePostData,
  UpdatePostData,
  type Post,
} from "@/lib/api-client";
import { toast } from "@/hooks/useToast";

/**
 * Hook to list posts
 * @param published - Filter by published status. Admin can omit to see all posts.
 *
 * Note: For admin dashboard (published === undefined), we allow refetch on mount
 * to ensure all posts are loaded after mutations. For public pages (published === true),
 * we use cached data to prevent unnecessary refetches.
 */
export function usePosts(published?: boolean) {
  // Admin queries (published === undefined) should refetch on mount after mutations
  // Public queries (published === true) use cached data for performance
  const isAdminQuery = published === undefined;

  return useQuery<ListPostsResponse, Error>({
    queryKey:
      published !== undefined ? ["posts", "published", published] : ["posts"], // Use 'posts' for admin to match optimistic update query keys
    queryFn: async () => {
      return await listPostsApi({ published, limit: 1000 });
    },
    refetchOnMount: isAdminQuery ? true : false, // Admin queries refetch to get latest data
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: false, // Don't refetch on reconnect
    staleTime: isAdminQuery ? 0 : Infinity, // Admin queries can be stale immediately, public queries never stale
  });
}

/**
 * Hook to get a single post by ID
 *
 * Note: This query only fetches once on initial load. Subsequent component mounts
 * will use cached data. The query will not refetch automatically.
 */
export function usePost(id: string) {
  return useQuery<Post, Error>({
    queryKey: ["posts", id],
    queryFn: async () => {
      return await getPostApi(id);
    },
    enabled: !!id, // Only run query if id is provided
    refetchOnMount: false, // Don't refetch when component mounts if data exists
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: false, // Don't refetch on reconnect
    staleTime: Infinity, // Data never becomes stale - only fetch once
  });
}

/**
 * Hook to create a new post
 */
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, CreatePostData>({
    mutationFn: async (data) => {
      return await createPostApi(data);
    },
    onSuccess: () => {
      // Invalidate all posts queries (both published and all posts for admin)
      // This will refetch active queries including admin queries (['posts']) and public queries (['posts', 'published', true])
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({
        title: "Post published!",
        description: "Your post is now live.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to create post",
        description: "Unable to create post. Please try again later.",
        variant: "destructive",
      });
    },
  });
}

/**
 * Hook to update a post
 */
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation<
    Post,
    Error,
    { id: string; data: UpdatePostData },
    {
      previousPostsList: ListPostsResponse | undefined;
      previousPost: Post | undefined;
    }
  >({
    mutationFn: async ({ id, data }) => {
      return await updatePostApi(id, data);
    },
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      await queryClient.cancelQueries({ queryKey: ["posts", id] });

      // Snapshot previous values for rollback
      const previousPostsList = queryClient.getQueryData<ListPostsResponse>([
        "posts",
      ]);
      const previousPost = queryClient.getQueryData<Post>(["posts", id]);

      // Optimistically update the post in the list
      if (previousPostsList) {
        queryClient.setQueryData<ListPostsResponse>(["posts"], {
          ...previousPostsList,
          posts: previousPostsList.posts.map((post) =>
            post.id === id ? { ...post, ...data } : post
          ),
        });
      }

      // Optimistically update individual post
      if (previousPost) {
        queryClient.setQueryData<Post>(["posts", id], {
          ...previousPost,
          ...data,
        });
      }

      return { previousPostsList, previousPost };
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousPostsList) {
        queryClient.setQueryData(["posts"], context.previousPostsList);
      }
      if (context?.previousPost) {
        queryClient.setQueryData(["posts", variables.id], context.previousPost);
      }
      toast({
        title: "Failed to update post",
        description: "Unable to update post. Please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: (data, variables) => {
      // Invalidate to ensure we have the latest from server
      // This will refetch active queries including admin queries (['posts']) and public queries (['posts', 'published', true])
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", variables.id] });
      toast({
        title: "Post updated!",
        description: "Your changes have been saved.",
      });
    },
  });
}

/**
 * Hook to delete a post
 */
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    string,
    { previousPostsList: ListPostsResponse | undefined }
  >({
    mutationFn: async (id) => {
      return await deletePostApi(id);
    },
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // Snapshot previous value for rollback
      const previousPostsList = queryClient.getQueryData<ListPostsResponse>([
        "posts",
      ]);

      // Optimistically remove post from list
      if (previousPostsList) {
        queryClient.setQueryData<ListPostsResponse>(["posts"], {
          ...previousPostsList,
          posts: previousPostsList.posts.filter((post) => post.id !== id),
          total: previousPostsList.total - 1,
        });
      }

      return { previousPostsList };
    },
    onError: (error, id, context) => {
      // Rollback on error (for delete, we should rollback to prevent data loss)
      if (context?.previousPostsList) {
        queryClient.setQueryData(["posts"], context.previousPostsList);
      }
      toast({
        title: "Failed to delete post",
        description: "Unable to delete post. Please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      // Invalidate to ensure we have the latest from server
      // This will refetch active queries including admin queries (['posts']) and public queries (['posts', 'published', true])
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({
        title: "Post deleted!",
        description: "The post has been removed.",
      });
    },
  });
}
