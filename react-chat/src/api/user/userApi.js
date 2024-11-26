import apiService from "../api.config.js";

const config = { skipAuth: false }
const userApi = {
  getCurrentUser: async () => {
    const { data } = await apiService.get("/api/user/current/", config);
    return data;
  },

  getAllUsers: async (page, page_size) => {
    const { data } = await apiService.get(`/api/users/`, {
      params: { page: page, page_size: page_size }
    });
    return data;
  },

  getUserById: async (userId) => {
    const { data } = await apiService.get(`/api/user/${userId}`, config);
    return data;
  },

  updateUser: async (id, formData) => {
    const { data } = await apiService.patch(`/api/user/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
      config);
    return data;
  },
};
export default userApi;