import { AxiosHeaders } from "axios";
import apiService from "../api.config.ts";
import { Message } from "../types.ts";

interface MessageListResponse {
  results: Message[];
}

const messageApi = {
  getMessages: async (id: number): Promise<Message[]> => {
    const { data } = await apiService.get<MessageListResponse>("/api/messages/", {
      params: { chat: id },
      headers: new AxiosHeaders(),
    });
    return data.results;
  },

  createNewMessage: async (formData: FormData): Promise<Message> => {
    const { data } = await apiService.post<Message>("/api/messages/", formData);
    return data;
  }
};
export default messageApi;
