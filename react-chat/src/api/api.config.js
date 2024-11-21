import axios from "axios";
import { getAccessToken, getExpiresAT, getExpiresRT, getRefreshToken, setTokens } from "./localStorageService";

const URL = import.meta.env.VITE_API_URL

const checkTokenValid = (expire) => {
  if (expire === null || expire === undefined || expire === 0) {
    return false
  }
  const now = Math.floor(Date.now() * 0.001);
  return now < expire
}

const getValidAccessToken = async () => {
  let accessToken = getAccessToken()
  const refreshToken = getRefreshToken()
  const expireRT = Number(getExpiresRT())
  const expireAT = Number(getExpiresAT())
  //если кто-то из пары отсутствует или просрочен RT, то сразу перекидываем на логин
  if (refreshToken === null
    || accessToken === null
    || checkTokenValid(expireRT) === false) {
    return false
  }
  //если at жив - возвращаем at
  if (checkTokenValid(expireAT)) {
    return accessToken
  }
  //если at мертв - обновляем at
  const response = await instance.post("/api/auth/refresh/", {
    refresh: refreshToken
  }, { skipAuth: true });
  setTokens(response.data.access, response.data.refresh)
  accessToken = response.data.access
  return accessToken
}

const instance = axios.create({
  baseURL: URL
});

instance.interceptors.request.use(
  async (config) => {
    if (config.skipAuth) {
      return config
    }
    const accessToken = await getValidAccessToken()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    else {
      return Promise.reject(new Error("Unauthorized"))
    }
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
)

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const apiService = {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch
};

export default apiService
