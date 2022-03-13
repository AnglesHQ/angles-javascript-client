import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

export class BaseRequests {

  protected axios: AxiosInstance;

  protected constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  protected success<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  protected post<T>(url: string, body: any, config?: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axios.post<T>(url, body, config)
        .then((response: AxiosResponse<T>) => {
          resolve(this.success(response));
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  protected get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axios.get<T>(url, config)
        .then((response: AxiosResponse<T>) => {
          resolve(this.success(response));
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  protected put<T>(url: string, body: any, config?: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axios.put<T>(url, body, config)
        .then((response: AxiosResponse<T>) => {
          resolve(this.success(response));
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axios.delete<T>(url, config)
        .then((response: AxiosResponse<T>) => {
          resolve(this.success(response));
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }
}
