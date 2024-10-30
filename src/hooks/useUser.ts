import { fetchUser } from "@/lib/api/fetchUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUser = (userId: string) => {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 1000 * 60 * 5,
  });

  const updateUserStatus = useMutation({
    mutationFn: async (status: 'online' | 'offline') => {
      const response = await fetch(`api/users/${userId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
      return response.json()
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['users', userId], updatedUser);
    },
  });

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    error: userQuery.error,
    updateStatus: updateUserStatus.mutate,
  };
};
