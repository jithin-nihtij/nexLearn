import axios, { AxiosError, type AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { logout } from "./auth";

const withAuth = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 210000,
  });

  instance.interceptors.request.use((config) => {
    const token = Cookies.get("auth_token");
    if (token) {
      if (config.headers) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (res: AxiosResponse) => {
      return res;
    },
    (err) => {
      if (err.response?.status === 401) {
        // processQueue(err, null);
        logout();
        // window.location.href = "/auth/login";
        return Promise.reject(err);
      }
      console.error(err);
      throw new AxiosError(err.response.data);
    }
  );

  return instance;
};

export const apiClient = withAuth();
