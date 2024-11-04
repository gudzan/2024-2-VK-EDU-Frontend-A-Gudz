const ACCESS_TOKEN_KEY = "access_token"
const REFRESH_TOKEN_KEY = "refresh_token"
const USER_ID_KEY = "userId"

export const getLocalStorage = (key) => {
  const json = localStorage.getItem(key);
  if (!json) {
    return null
  }
  return JSON.parse(json);
}

export const setLocalStorage = (key, object) => {
  localStorage.setItem(key, JSON.stringify(object));
}

export const getAccessToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) {
    return null
  }
  return token;
}

export const getRefreshToken = () => {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!token) {
    return null
  }
  return token;
}

export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}