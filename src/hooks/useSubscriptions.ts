import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createSubscriptionApi,
  CreateSubscriptionData,
  CreateSubscriptionResponse,
} from "@/lib/api-client";
import { toast } from "@/hooks/useToast";

/**
 * Hook to create a subscription (public endpoint - used for user signup)
 */
export function useCreateSubscription() {
  const queryClient = useQueryClient();

  return useMutation<CreateSubscriptionResponse, Error, CreateSubscriptionData>(
    {
      mutationFn: async (data) => {
        return await createSubscriptionApi(data);
      },
      onSuccess: (data) => {
        // Invalidate subscribers list to refetch (in case admin is viewing)
        queryClient.invalidateQueries({ queryKey: ["subscribers"] });
        toast({
          title: "Subscription successful!",
          description: `You're now subscribed to the ${data.plan} plan.`,
        });
      },
      onError: () => {
        toast({
          title: "Subscription failed",
          description:
            "Unable to complete your subscription. Please try again later.",
          variant: "destructive",
        });
      },
    }
  );
}
