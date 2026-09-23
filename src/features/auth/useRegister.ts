import { useMutation } from "@tanstack/react-query";
import type { ApiError, RegisterRequest, UserResponse } from "./types";
import type { AxiosError } from "axios";
import { apiClient } from "../../api/client";

export function useRegister() {
  return useMutation<UserResponse, AxiosError<ApiError>, RegisterRequest>({
    mutationFn: async (credentials) => {
      const response = await apiClient.post<UserResponse>(
        "/users",
        credentials,
      );

      return response.data;
    },
  });
}
