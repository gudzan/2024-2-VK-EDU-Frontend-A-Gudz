const ACCESS_TOKEN_KEY = "access_token"
const REFRESH_TOKEN_KEY = "refresh_token"
const EXPIRES_AT_KEY = "expiresAT";
const EXPIRES_RT_KEY = "expiresRT";
const USER_ID_KEY = "userId"

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export const getExpiresAT = () => {
  return localStorage.getItem(EXPIRES_AT_KEY);
}

export const getExpiresRT = () => {
  return localStorage.getItem(EXPIRES_RT_KEY);
}

export const getUserId = () => {
  return localStorage.getItem(USER_ID_KEY);
}

export const setTokens = (accessToken, refreshToken, expAT, expRT, user_id) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(EXPIRES_AT_KEY, expAT);
  localStorage.setItem(EXPIRES_RT_KEY, expRT);
  localStorage.setItem(USER_ID_KEY, user_id);
}

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(EXPIRES_AT_KEY);
  localStorage.removeItem(EXPIRES_RT_KEY);
  localStorage.removeItem(USER_ID_KEY);
}

const localStorageService = {
  setTokens,
  removeTokens,
  getAccessToken,
  getRefreshToken,
  getExpiresAT,
  getExpiresRT,
  getUserId
};

export default localStorageService;
