import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiClient } from "../../../api/client";
import type { Credential } from "../types";

interface UpdateCredentialDescriptionRequest {
  credentialId: string;
  description: string;
}

export function useUpdateCredentialDescription() {
  const queryClient = useQueryClient();

  return useMutation<
    Credential,
    AxiosError<string>,
    UpdateCredentialDescriptionRequest
  >({
    mutationFn: async ({ credentialId, description }) => {
      const response = await apiClient.put<Credential>(
        `/credentials/${credentialId}/description`,
        {
          description,
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
