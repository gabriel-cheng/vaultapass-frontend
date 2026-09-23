import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { UserResponse, ApiError, LoginRequest } from "./types";
import { apiClient } from "../../api/client";

export function useLogin() {
  return useMutation<UserResponse, AxiosError<ApiError>, LoginRequest>({
    mutationFn: async (credentials) => {
      const response = await apiClient.post<UserResponse>(
        "/auth/login",
        credentials,
      );

      return response.data;
    },
  });
}
