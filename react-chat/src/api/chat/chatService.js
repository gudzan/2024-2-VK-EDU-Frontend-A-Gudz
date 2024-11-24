import apiService from "../api.config.js";

const config = { skipAuth: false }
const chatService = {
  getChat: async (id) => {
    const { data } = await apiService.get(`/api/chat/${id}`, config);
    return data;
  },

  getAllChats: async () => {
    const { data } = await apiService.get("/api/chats/", config);
    return data.results;
  },

  getAllChatsWithSearch: async (search) => {
    const { data } = await apiService.get(`/api/chats/?search=${search}`, config);
    return data.results;
  },

  createNewChat: async (memberId) => {
    const { data } = await apiService.post('/api/chats/',
      {
        "members": [
          memberId
        ],
        "is_private": true,
        "title": "Название чата" //временные заглушки
      },
      config
    );
    return data;
  },
};
export default chatService;