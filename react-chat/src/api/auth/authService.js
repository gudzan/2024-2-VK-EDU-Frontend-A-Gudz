import apiService from "../api.config.js";
import { setTokens } from "../localStorageService.js";

const authService = {
  register: async (formData) => {
    const { data } = await apiService.post("/api/register/", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  },

  auth: async ({ username, password }) => {
    // debugger
    const { data } = await apiService.post("/api/auth/", { username, password });
    // console.log(data);

    // setTokens(data.access, data.refresh)
    return data;
  },
};
export default authService;