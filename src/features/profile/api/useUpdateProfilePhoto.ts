import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserResponse } from "../../auth/types";
import { apiClient } from "../../../api/client";

export function useUpdateProfilePhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();

      formData.append("file", file);

      const response = await apiClient.put<UserResponse>(
        "/users/me/profile-photo",
        formData,
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
  });
}
