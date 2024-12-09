import apiService from "../api.config.js"

const chatApi = {
  getChat: async (id) => {
    const { data } = await apiService.get(`/api/chat/${id}/`)
    return data
  },

  getAllChats: async () => {
    const { data } = await apiService.get("/api/chats/")
    return data.results
  },

  getAllChatsWithSearch: async (search) => {
    const { data } = await apiService.get("/api/chats/", {
      params: { search }
    })
    return data.results
  },

  leaveChat: async (id) => {
    const { data } = await apiService.post(`/api/chat/${id}/leave/`)
    return data
  },

  deleteChat: async (id) => {
    const { data } = await apiService.delete(`/api/chat/${id}/`)
    return data
  },

  createNewChat: async (formData) => {
    const { data } = await apiService.post("/api/chats/", formData)
    return data
  }
}
export default chatApi
