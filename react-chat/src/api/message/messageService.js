import apiService from "../api.config.js";

const messageService = {
  getMessages: async (id) => {
    const { data } = await apiService.get(`/api/messages/?chat=${id}`);
    return data.results;
  },

  createNewMessage: async (formData) => {
    const { data } = await apiService.post(`/api/messages/`, formData);
    return data;
  },
};
export default messageService;