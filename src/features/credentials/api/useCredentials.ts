import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api/client";
import type { Credential } from "../types";

export function useCredentials() {
  return useQuery({
    queryKey: ["credentials"],
    queryFn: async () => {
      const response = await apiClient.get<Credential[]>("/credentials");

      return response.data;
    },
  });
}
