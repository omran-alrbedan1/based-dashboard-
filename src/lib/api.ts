// lib/api.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Define response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized - token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
        
        if (refreshToken) {
          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL || '/api'}/auth/refresh`, {
            refresh_token: refreshToken,
          });
          
          const { access_token } = response.data;
          localStorage.setItem('access_token', access_token);
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Redirect to login if refresh fails
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'An error occurred',
      statusCode: error.response?.status,
      errors: error.response?.data?.errors,
    };
    
    return Promise.reject(apiError);
  }
);

// Generic wrapper methods with types
const apiWrapper = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => 
    api.get(url, config).then((response) => response.data),
  
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => 
    api.post(url, data, config).then((response) => response.data),
  
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => 
    api.put(url, data, config).then((response) => response.data),
  
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => 
    api.patch(url, data, config).then((response) => response.data),
  
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => 
    api.delete(url, config).then((response) => response.data),
};

export default api;

export { api as rawApi, apiWrapper };