import { ApiResponse } from '@/hooks/useDataFetching';
import axios, { AxiosRequestConfig } from 'axios'

export const createApiClient = () => {
  const request = async <T>(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      let response;
      
      switch (method) {
        case 'get':
          response = await axios.get<ApiResponse<T>>(url, { ...config, params: data });
          break;
        case 'post':
          response = await axios.post<ApiResponse<T>>(url, data, config);
          break;
        case 'put':
          response = await axios.put<ApiResponse<T>>(url, data, config);
          break;
        case 'delete':
          response = await axios.delete<ApiResponse<T>>(url, { ...config, data });
          break;
        case 'patch':
          response = await axios.patch<ApiResponse<T>>(url, data, config);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      
      if (!response.data.success) {
        throw new Error(response.data.message || `Failed to ${method} ${url}`);
      }
      
      return response.data.data;
    } catch (error) {
      console.error(`API Error (${method} ${url}):`, error);
      throw error;
    }
  };

  const get = <T>(url: string, params?: any, config?: AxiosRequestConfig) => 
    request<T>('get', url, params, config);

  const post = <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    request<T>('post', url, data, config);

  const put = <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    request<T>('put', url, data, config);

  const patch = <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    request<T>('patch', url, data, config);

  const del = <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    request<T>('delete', url, data, config);

  return { get, post, put, patch, delete: del };
};
