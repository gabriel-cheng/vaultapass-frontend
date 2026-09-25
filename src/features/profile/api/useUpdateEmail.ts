import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { UserResponse } from "../../auth/types";
import { apiClient } from "../../../api/client";

interface UpdateEmailRequest {
  email: string;
  currentPassword: string;
}

export function useUpdateEmail() {
  const queryClient = useQueryClient();

  return useMutation<UserResponse, AxiosError<string>, UpdateEmailRequest>({
    mutationFn: async ({ email, currentPassword }) => {
      const response = await apiClient.put<UserResponse>("/users/me/email", {
        email,
        currentPassword,
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
