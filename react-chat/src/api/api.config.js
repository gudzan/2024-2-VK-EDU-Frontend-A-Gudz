import axios from "axios";
import { getAccessToken, getRefreshToken, setLocalStorage, setTokens } from "./localSrorage";

export const instance = axios.create({
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getAccessToken()}`
    return config
  }
)

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalConfig = error.config;
    if (originalConfig.url !== "/api/auth/refresh/" && error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          
          const token = getRefreshToken()
          const response = await instance.post("/api/auth/refresh/", {
            refresh: token
          });
          setTokens(response.data.access, response.data.refresh)
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(error);
  }


  //  originalRequest._isRetry = true; 
  //   if (
  //     error.response.status === 401 && 
  //     error.config &&
  //     !error.config._isRetry
  //   ) {
  //     try {
  //       const response = await instance.post("/api/auth/refresh/", {
  //         refresh: getRrefreshToken()
  //       });
  //       console.log(response.data);

  //       setTokens(response.data.access, response.data.refresh)
  //       return instance.request(originalRequest);
  //     } catch (error) {
  //       console.log("AUTH ERROR");
  //     }
  //   }
  //   throw error;
  // }
);
