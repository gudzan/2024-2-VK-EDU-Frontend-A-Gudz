import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosHeaders } from "axios";
import {
  getAccessToken,
  getExpiresAT,
  getExpiresRT,
  getRefreshToken,
  setTokens
} from "./localStorageService.ts";

interface RefreshTokenRequest {
  refresh: string;
}

interface RefreshTokenResponse {
  access: string;
  refresh: string;
}

const checkTokenValid = (expire: number | null): boolean => {
  if (!expire || expire === 0) return false;
  const now = Math.floor(Date.now() * 0.001);
  return now < expire;
};

const getValidAccessToken = async (): Promise<string | false> => {
  let accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const expireRT = Number(getExpiresRT());
  const expireAT = Number(getExpiresAT());

  if (!refreshToken || !accessToken || !checkTokenValid(expireRT)) {
    return false;
  }

  if (checkTokenValid(expireAT)) {
    return accessToken;
  }

  const response = await axios.post<RefreshTokenResponse>(
    "/api/auth/refresh/",
    { refresh: refreshToken } as RefreshTokenRequest,
    { headers: new AxiosHeaders({ skipAuth: "true" }) }
  );

  const { access, refresh } = response.data;
  setTokens(access, refresh);
  accessToken = access;
  return accessToken;
};

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  skipAuth?: boolean;
}

class API {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL });
    this.instance.interceptors.request.use(this.handleRequest, this.handleError);
    this.instance.interceptors.response.use(
      (response) => response,
      this.handleError
    );
  }

  private handleRequest = async (config: CustomAxiosRequestConfig): Promise<CustomAxiosRequestConfig> => {
    if (config.skipAuth) return config;
    const accessToken = await getValidAccessToken();
    if (accessToken) {
      config.headers = new AxiosHeaders({
        ...config.headers?.toJSON(),
        Authorization: `Bearer ${accessToken}`,
      });
    } else {
      return Promise.reject(new Error("Unauthorized"));
    }
    return config;
  };

  private handleError = (error: any): Promise<any> => {
    return Promise.reject(error);
  };

  public async call<T>(method: string, url: string, data?: unknown, config?: CustomAxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.request({ method, url, data, ...config });
  }

  public async get<T>(url: string, config?: CustomAxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.call<T>("GET", url, undefined, config);
  }

  public async post<T>(url: string, data?: unknown, config?: CustomAxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.call<T>("POST", url, data, config);
  }

  public async put<T>(url: string, data: unknown, config?: CustomAxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.call<T>("PUT", url, data, config);
  }

  public async patch<T>(url: string, data: unknown, config?: CustomAxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.call<T>("PATCH", url, data, config);
  }

  public async delete<T>(url: string, config?: CustomAxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.call<T>("DELETE", url, undefined, config);
  }
}

export default new API(import.meta.env.VITE_API_URL as string);
