import apiService from "../api.config.js";

const userService = {
  getCurrentUser: async () => {
    const { data } = await apiService.get("/api/user/current/");
    return data;
  },

  updateUser: async (id, formData) => {
    const { data } = await apiService.patch(`/api/user/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  },
};
export default userService;