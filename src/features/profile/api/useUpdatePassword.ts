import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiClient } from "../../../api/client";

interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export function useUpdatePassword() {
  return useMutation<void, AxiosError<string>, UpdatePasswordRequest>({
    mutationFn: async ({
      currentPassword,
      newPassword,
    }: UpdatePasswordRequest) => {
      await apiClient.put("/users/me/password", {
        currentPassword,
        newPassword,
      });
    },
  });
}
