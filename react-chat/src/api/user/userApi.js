import apiService from "../api.config.js"

const userApi = {
  getCurrentUser: async () => {
    const { data } = await apiService.get("/api/user/current/")
    return data
  },

  getAllUsers: async (page, page_size) => {
    const { data } = await apiService.get("/api/users/", {
      params: { page, page_size }
    })
    return data
  },

  getUserById: async (userId) => {
    const { data } = await apiService.get(`/api/user/${userId}`)
    return data
  },

  updateUser: async (id, formData) => {
    const { data } = await apiService.patch(`/api/user/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    return data
  }
}
export default userApi
