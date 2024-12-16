import { AxiosHeaders } from "axios";
import apiService from "../api.config";
import { User } from "../types";

interface UserResponse {
  count: number
  next: string
  previous: string
  results: User[]
}

const userApi = {
  getCurrentUser: async (): Promise<User> => {
    const { data } = await apiService.get<User>("/api/user/current/");
    return data;
  },

  getAllUsers: async (page: number, page_size: number): Promise<UserResponse> => {
    const { data } = await apiService.get<UserResponse>("/api/users/", {
      params: { page, page_size },
      headers: new AxiosHeaders()
    });
    return data;
  },

  getUserById: async (userId: string): Promise<User> => {
    const { data } = await apiService.get<User>(`/api/user/${userId}`);
    return data;
  },

  updateUser: async (id: number, formData: FormData): Promise<User> => {
    const { data } = await apiService.patch<User>(`/api/user/${id}/`, formData, {
      headers: new AxiosHeaders({
        "Content-Type": "multipart/form-data",
      })
    });
    return data;
  },
};
export default userApi;
