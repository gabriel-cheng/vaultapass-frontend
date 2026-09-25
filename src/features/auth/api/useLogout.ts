import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../api/client";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.post("/auth/logout");
    },

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["current-user"],
      });
    },
  });
}
