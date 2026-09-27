import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiClient } from "../../../api/client";
import type { Credential } from "../types";

export interface CreateCredentialRequest {
  platformName: string;
  login: string;
  password: string;
  email: string | null;
  link: string | null;
  description: string | null;
}

export function useCreateCredential() {
  const queryClient = useQueryClient();

  return useMutation<Credential, AxiosError<string>, CreateCredentialRequest>({
    mutationFn: async (credential) => {
      const response = await apiClient.post<Credential>(
        "/credentials",
        credential,
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["credentials"],
      });
    },
  });
}
