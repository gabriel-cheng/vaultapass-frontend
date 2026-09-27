import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiClient } from "../../../api/client";

export function useDeleteCredential() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<string>, string>({
    mutationFn: async (credentialId) => {
      await apiClient.delete(`/credentials/${credentialId}`);
    },

    onSuccess: (_, credentialId) => {
      queryClient.invalidateQueries({
        queryKey: ["credentials"],
      });

      queryClient.removeQueries({
        queryKey: ["credential", credentialId],
      });

      queryClient.removeQueries({
        queryKey: ["credentialPassword", credentialId],
      });
    },
  });
}
