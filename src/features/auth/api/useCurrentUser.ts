import { useQuery } from "@tanstack/react-query";
import type { UserResponse } from "../types";
import { apiClient } from "../../../api/client";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await apiClient.get<UserResponse>("/users/me");

      return response.data;
    },
    retry: false,
  });
}
