import { AxiosHeaders } from "axios";
import apiService from "../api.config.js";
import { Chat } from "../types.js";

interface ChatListResponse {
  results: Chat[];
}

const chatApi = {
  getChat: async (id: number): Promise<Chat> => {
    const { data } = await apiService.get<Chat>(`/api/chat/${id}/`);
    return data;
  },

  getAllChats: async (): Promise<Chat[]> => {
    const { data } = await apiService.get<ChatListResponse>("/api/chats/");
    return data.results;
  },

  getAllChatsWithSearch: async (search: string): Promise<Chat[]> => {
    const { data } = await apiService.get<ChatListResponse>("/api/chats/", {
      params: { search },
      headers: new AxiosHeaders(),
    });
    return data.results;
  },

  leaveChat: async (id: number): Promise<string> => {
    const { data } = await apiService.post<string>(`/api/chat/${id}/leave/`);
    return data;
  },

  deleteChat: async (id: number): Promise<string> => {
    const { data } = await apiService.delete<string>(`/api/chat/${id}/`);
    return data;
  },

  createNewChat: async (formData: FormData): Promise<Chat> => {
    const { data } = await apiService.post<Chat>("/api/chats/", formData);
    return data;
  },
};
export default chatApi;
