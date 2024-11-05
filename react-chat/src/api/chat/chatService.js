import apiService from "../api.config.js";

const chatService = {
  getChat: async (id) => {
    const { data } = await apiService.get(`/api/chat/${id}`);
    return data;
  },

  getAllChats: async () => {
    const { data } = await apiService.get("/api/chats/");
    return data.results;
  },

  getAllChatsWithSearch: async (search) => {
    const { data } = await apiService.get(`/api/chats/?search=${search}`);
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
      }
    );
    return data;
  },
};
export default chatService;