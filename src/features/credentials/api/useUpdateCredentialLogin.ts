import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiClient } from "../../../api/client";
import type { Credential } from "../types";

interface UpdateCredentialLoginRequest {
  credentialId: string;
  login: string;
}

export function useUpdateCredentialLogin() {
  const queryClient = useQueryClient();

  return useMutation<
    Credential,
    AxiosError<string>,
    UpdateCredentialLoginRequest
  >({
    mutationFn: async ({ credentialId, login }) => {
      const response = await apiClient.put<Credential>(
        `/credentials/${credentialId}/login`,
        {
          login,
        },
      );

      return response.data;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["credential", variables.credentialId],
      });

      queryClient.invalidateQueries({
        queryKey: ["credentials"],
      });
    },
  });
}
