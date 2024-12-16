import { AxiosHeaders } from "axios";
import apiService, { CustomAxiosRequestConfig } from "../api.config.ts";

interface AuthRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  access: string;
  refresh: string;
}

const authApi = {
  register: async (formData: FormData): Promise<AuthResponse> => {
    const { data } = await apiService.post<AuthResponse>("/api/register/", formData, {
      headers: new AxiosHeaders({ "Content-Type": "multipart/form-data" }),
      skipAuth: true
    } as CustomAxiosRequestConfig);
    return data;
  },

  auth: async (credentials: AuthRequest): Promise<AuthResponse> => {
    const { data } = await apiService.post<AuthResponse>("/api/auth/", credentials, { skipAuth: true } as CustomAxiosRequestConfig);
    return data;
  }
};
export default authApi;
