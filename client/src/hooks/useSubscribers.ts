import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  listSubscribersApi,
  createSubscriberApi,
  updateSubscriberApi,
  deleteSubscriberApi,
  ListSubscribersParams,
  ListSubscribersResponse,
  UpdateSubscriberData,
  type Subscriber,
} from '@/lib/api-client';
import { toast } from '@/hooks/useToast';

/**
 * Hook to list subscribers (admin only)
 * 
 * Note: This query only fetches once on initial load. Subsequent component mounts
 * will use cached data. The query will not refetch automatically.
 */
export function useSubscribers(params?: ListSubscribersParams) {
  // Normalize params to prevent unnecessary refetches when object reference changes
  // Create a stable key from params values
  const queryKey = params 
    ? ['subscribers', params.skip ?? 0, params.limit ?? 100, params.is_active]
    : ['subscribers'];
  
  return useQuery<ListSubscribersResponse, Error>({
    queryKey,
    queryFn: async () => {
      return await listSubscribersApi(params);
    },
    refetchOnMount: false, // Don't refetch when component mounts if data exists
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: false, // Don't refetch on reconnect
    staleTime: Infinity, // Data never becomes stale - only fetch once
  });
}

/**
 * Hook to create a new subscriber
 */
export function useCreateSubscriber() {
  const queryClient = useQueryClient();

  return useMutation<Subscriber, Error, { email: string; name: string }>({
    mutationFn: async ({ email, name }) => {
      return await createSubscriberApi(email, name);
    },
    onSuccess: () => {
      // Invalidate subscribers list to refetch
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
      toast({
        title: 'Subscriber added!',
        description: 'New subscriber has been created.',
      });
    },
    onError: () => {
      toast({
        title: 'Failed to create subscriber',
        description: 'Unable to create subscriber. Please try again later.',
        variant: 'destructive',
      });
    },
  });
}

/**
 * Hook to update a subscriber (toggle status, change plan, etc.)
 */
export function useUpdateSubscriber() {
  const queryClient = useQueryClient();

  return useMutation<
    Subscriber,
    Error,
    { id: string; data: UpdateSubscriberData },
    { previousSubscribers: ListSubscribersResponse | undefined }
  >({
    mutationFn: async ({ id, data }) => {
      return await updateSubscriberApi(id, data);
    },
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['subscribers'] });

      // Snapshot previous value for rollback
      const previousSubscribers = queryClient.getQueryData<ListSubscribersResponse>(['subscribers']);

      // Optimistically update subscriber in list
      if (previousSubscribers) {
        queryClient.setQueryData<ListSubscribersResponse>(['subscribers'], {
          ...previousSubscribers,
          subscribers: previousSubscribers.subscribers.map((sub) =>
            sub._id === id ? { ...sub, ...data } as Subscriber : sub
          ),
        });
      }

      return { previousSubscribers };
    },
    onError: () => {
      // Keep optimistic update per user preference (show error toast but don't rollback)
      toast({
        title: 'Failed to update subscriber',
        description: 'Unable to update subscriber. Please try again later.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      // Invalidate to ensure we have the latest from server
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
    },
  });
}

/**
 * Hook to delete a subscriber
 */
export function useDeleteSubscriber() {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    string,
    { previousSubscribers: ListSubscribersResponse | undefined }
  >({
    mutationFn: async (id) => {
      return await deleteSubscriberApi(id);
    },
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['subscribers'] });

      // Snapshot previous value for rollback
      const previousSubscribers = queryClient.getQueryData<ListSubscribersResponse>(['subscribers']);

      // Optimistically remove subscriber from list
      if (previousSubscribers) {
        queryClient.setQueryData<ListSubscribersResponse>(['subscribers'], {
          ...previousSubscribers,
          subscribers: previousSubscribers.subscribers.filter((sub) => sub._id !== id),
          total: previousSubscribers.total - 1,
        });
      }

      return { previousSubscribers };
    },
    onError: (error, id, context) => {
      // Rollback on error for delete operations
      if (context?.previousSubscribers) {
        queryClient.setQueryData(['subscribers'], context.previousSubscribers);
      }
      toast({
        title: 'Failed to delete subscriber',
        description: 'Unable to delete subscriber. Please try again later.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      // Invalidate to ensure we have the latest from server
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
      toast({
        title: 'Subscriber deleted!',
        description: 'The subscriber has been removed.',
      });
    },
  });
}

