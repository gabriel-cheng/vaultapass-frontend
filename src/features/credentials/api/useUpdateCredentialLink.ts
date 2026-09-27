import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiClient } from "../../../api/client";
import type { Credential } from "../types";

interface UpdateCredentialLinkRequest {
  credentialId: string;
  link: string;
}

export function useUpdateCredentialLink() {
  const queryClient = useQueryClient();

  return useMutation<
    Credential,
    AxiosError<string>,
    UpdateCredentialLinkRequest
  >({
    mutationFn: async ({ credentialId, link }) => {
      const response = await apiClient.put<Credential>(
        `/credentials/${credentialId}/link`,
        {
          link,
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
