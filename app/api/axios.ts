import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getAccessToken } from './authUtils';

// 커스텀 설정 타입 정의
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 커스텀 에러 타입 정의
interface CustomAxiosError extends AxiosError {
  config: CustomAxiosRequestConfig;
}
// axios 인스턴스 생성
const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError | CustomAxiosError) => {
    const customError = error as CustomAxiosError;

    if (customError.response?.status === 401 && customError.config && !customError.config._retry) {
      customError.config._retry = true;
      try {
        // 리프레시 토큰을 사용하여 새 액세스 토큰 요청
        await instance.post('/auth/refresh');
        // 원래 요청 재시도
        return instance(customError.config);
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError);
        // 로그아웃 로직 구현
        window.location.href = '/logout';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// API 함수들
export const api = {
  get: <T>(url: string, config = {}) => instance.get<T>(url, config),
  post: <T>(url: string, data = {}, config = {}) => instance.post<T>(url, data, config),
  put: <T>(url: string, data = {}, config = {}) => instance.put<T>(url, data, config),
  delete: <T>(url: string, config = {}) => instance.delete<T>(url, config),
};

export default api;