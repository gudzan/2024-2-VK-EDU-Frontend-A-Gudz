import apiService from "../api.config.js";

const messageService = {
  getMessages: async (id) => {
    const { data } = await apiService.get(`/api/messages/?chat=${id}`);
    return data.results;
  },

  createNewMessage: async (messageText, chatId) => {
    const { data } = await apiService.post(`/api/messages/`,
      {
        "text": messageText,
        "chat": chatId,
      }
    );
    return data;
  },
};
export default messageService;