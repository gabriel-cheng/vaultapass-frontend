import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiClient } from "../../../api/client";
import type { Credential } from "../types";

interface UpdateCredentialPlatformNameRequest {
  credentialId: string;
  platformName: string;
}

export function useUpdateCredentialPlatformName() {
  const queryClient = useQueryClient();

  return useMutation<
    Credential,
    AxiosError<string>,
    UpdateCredentialPlatformNameRequest
  >({
    mutationFn: async ({ credentialId, platformName }) => {
      const response = await apiClient.put<Credential>(
        `/credentials/${credentialId}/platform-name`,
        {
          platformName,
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
