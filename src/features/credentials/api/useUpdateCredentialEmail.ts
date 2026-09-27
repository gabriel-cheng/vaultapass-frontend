import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiClient } from "../../../api/client";
import type { Credential } from "../types";

interface UpdateCredentialEmailRequest {
  credentialId: string;
  email: string;
}

export function useUpdateCredentialEmail() {
  const queryClient = useQueryClient();

  return useMutation<
    Credential,
    AxiosError<string>,
    UpdateCredentialEmailRequest
  >({
    mutationFn: async ({ credentialId, email }) => {
      const response = await apiClient.put<Credential>(
        `/credentials/${credentialId}/email`,
        {
          email,
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
