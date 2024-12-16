const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const EXPIRES_AT_KEY = "expiresAT";
const EXPIRES_RT_KEY = "expiresRT";
const USER_ID_KEY = "userId";

export const getAccessToken = (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY);
export const getRefreshToken = (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY);
export const getExpiresAT = (): string | null => localStorage.getItem(EXPIRES_AT_KEY);
export const getExpiresRT = (): string | null => localStorage.getItem(EXPIRES_RT_KEY);
export const getUserId = (): string | null => localStorage.getItem(USER_ID_KEY);

export const setAllInfo = (accessToken: string, refreshToken: string, expAT: string, expRT: string, userId: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(EXPIRES_AT_KEY, expAT);
  localStorage.setItem(EXPIRES_RT_KEY, expRT);
  localStorage.setItem(USER_ID_KEY, userId);
};

export const setTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const removeTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(EXPIRES_AT_KEY);
  localStorage.removeItem(EXPIRES_RT_KEY);
  localStorage.removeItem(USER_ID_KEY);
};

const localStorageService = {
  setAllInfo,
  setTokens,
  removeTokens,
  getAccessToken,
  getRefreshToken,
  getExpiresAT,
  getExpiresRT,
  getUserId
};

export default localStorageService;
