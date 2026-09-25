import { useQuery } from "@tanstack/react-query";
import type { UserResponse } from "../types";
import { apiClient } from "../../../api/client";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await apiClient.get<UserResponse>("/auth/me");

      return response.data;
    },
    retry: false,
  });
}
