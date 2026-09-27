import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiClient } from "../../../api/client";

interface UpdateCredentialPasswordRequest {
  credentialId: string;
  password: string;
}

export function useUpdateCredentialPassword() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<string>, UpdateCredentialPasswordRequest>(
    {
      mutationFn: async ({ credentialId, password }) => {
        await apiClient.put(`/credentials/${credentialId}/password`, {
          password,
        });
      },

      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["credential", variables.credentialId],
        });

        queryClient.removeQueries({
          queryKey: ["credentialPassword", variables.credentialId],
        });
      },
    },
  );
}
