import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api/client";

interface CredentialPasswordResponse {
  password: string;
}

export function useCredentialPassword(credentialId: string) {
  return useQuery({
    queryKey: ["credentialPassword", credentialId],

    queryFn: async () => {
      const response = await apiClient.get<CredentialPasswordResponse>(
        `/credentials/${credentialId}/password`,
      );

      return response.data.password;
    },

    enabled: false,
    retry: false,
  });
}
