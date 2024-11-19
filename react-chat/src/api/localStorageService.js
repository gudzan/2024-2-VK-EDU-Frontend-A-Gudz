import parseJwt from "../utils/parseJwt";
const ACCESS_TOKEN_KEY = "access_token"
const REFRESH_TOKEN_KEY = "refresh_token"
const EXPIRES_IN_KEY = "expiresIn";
const USER_ID_KEY = "userId"

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export const getExpiresIn = () => {
  return localStorage.getItem(EXPIRES_IN_KEY);
}

export const getUserId = () => {
  return localStorage.getItem(USER_ID_KEY);
}

export const setTokens = (accessToken, refreshToken) => {
  const { exp, user_id } = parseJwt(accessToken)
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(EXPIRES_IN_KEY, exp);
  localStorage.setItem(USER_ID_KEY, user_id);
}

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(EXPIRES_IN_KEY);
  localStorage.removeItem(USER_ID_KEY);
}

const localStorageService = {
  setTokens,
  removeTokens,
  getAccessToken,
  getRefreshToken,
  getExpiresIn,
  getUserId
};

export default localStorageService;
