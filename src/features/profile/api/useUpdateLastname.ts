import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserResponse } from "../../auth/types";
import { apiClient } from "../../../api/client";

interface UpdateLastnameRequest {
  lastname: string;
}

export function useUpdateLastname() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lastname }: UpdateLastnameRequest) => {
      const response = await apiClient.put<UserResponse>("/users/me/lastname", {
        lastname,
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
