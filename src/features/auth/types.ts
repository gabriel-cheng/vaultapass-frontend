export interface LoginRequest {
  username: string;
  password: string;
}

export interface UserResponse {
  id: string;
  name: string;
  lastname: string;
  username: string;
  email: string;
  profilePhotoUrl: string | null;
  createdAt: string;
}

export interface RegisterRequest {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

export type ApiError = string;
