import axios from "axios";
import { getAccessToken, getRefreshToken, setTokens } from "./localSrorage";

export const instance = axios.create({
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    if (config.url !== "/api/register/") {
      config.headers.Authorization = `Bearer ${getAccessToken()}`
    }
    return config
  }
)

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalConfig = error.config;
    if (originalConfig.url !== "/api/auth/refresh/" && originalConfig.url !== "/api/register/" && error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const token = getRefreshToken()
          if (token) {
            const response = await instance.post("/api/auth/refresh/", {
              refresh: token
            });
            setTokens(response.data.access, response.data.refresh)
            return instance(originalConfig);
          }
          else {
            return Promise.reject(new Error("Unauthorized"));
          }
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(error);
  }
);
