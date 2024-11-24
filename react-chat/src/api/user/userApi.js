import apiService from "../api.config.js";

const config = { skipAuth: false }
const userApi = {
  getCurrentUser: async () => {
    const { data } = await apiService.get("/api/user/current/", config);
    return data;
  },

  getAllUsers: async () => {
    const { data } = await apiService.get(`/api/users/`, config);
    return data.results;
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