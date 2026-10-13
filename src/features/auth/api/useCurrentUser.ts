import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import type { UserResponse } from "../types";
import { apiClient } from "../../../api/client";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async (): Promise<UserResponse | null> => {
      try {
        const response = await apiClient.get<UserResponse>("/auth/me");

        return response.data;
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          return null;
        }

        throw error;
      }
    },
    retry: false,
  });
}
