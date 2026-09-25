import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserResponse } from "../../auth/types";
import { apiClient } from "../../../api/client";

interface UpdateUsernameRequest {
  username: string;
}

export function useUpdateUsername() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ username }: UpdateUsernameRequest) => {
      const response = await apiClient.put<UserResponse>("/users/me/username", {
        username,
      });

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
  });
}
