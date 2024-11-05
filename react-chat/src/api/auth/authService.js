import apiService from "../api.config.js";
import { setTokens } from "../localSrorage.js";

const authService = {
  register: async (formData) => {
    const { data } = await apiService.post("/api/register/", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  },

  auth: async (formData) => {
    const { data } = await apiService.post("/api/auth/", formData);
    setTokens(data.access, data.refresh)
    return data;
  },
};
export default authService;