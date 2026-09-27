import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api/client";
import type { Credential } from "../types";

export function useCredential(credentialId: string) {
  return useQuery({
    queryKey: ["credential", credentialId],

    queryFn: async () => {
      const response = await apiClient.get<Credential>(
        `/credentials/${credentialId}`,
      );

      return response.data;
    },

    retry: false,
  });
}
