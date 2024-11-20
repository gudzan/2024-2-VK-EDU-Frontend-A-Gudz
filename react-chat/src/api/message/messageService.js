import apiService from "../api.config.js";

const config = { skipAuth: false }
const messageService = {
  getMessages: async (id) => {
    const { data } = await apiService.get(`/api/messages/?chat=${id}`, config);
    return data.results;
  },

  createNewMessage: async (formData) => {
    const { data } = await apiService.post(`/api/messages/`, formData, config);
    return data;
  },
};
export default messageService;