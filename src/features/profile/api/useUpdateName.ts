import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserResponse } from "../../auth/types";
import { apiClient } from "../../../api/client";

interface UpdateNameRequest {
  name: string;
}

export function useUpdateName() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name }: UpdateNameRequest) => {
      const response = await apiClient.put<UserResponse>("/users/me/name", {
        name,
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
