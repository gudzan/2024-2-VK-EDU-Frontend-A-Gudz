import apiService from "../api.config.js"

const authApi = {
  register: async (formData) => {
    const { data } = await apiService.post("/api/register/", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      skipAuth: true
    })
    return data
  },

  auth: async ({ username, password }) => {
    const { data } = await apiService.post("/api/auth/", { username, password }, { skipAuth: true })
    return data
  }
}
export default authApi
