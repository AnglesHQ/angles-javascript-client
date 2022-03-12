import {AxiosResponse, AxiosInstance, AxiosError} from 'axios';
import { BaseRequests } from './BaseRequests';
import { Environment } from '../models/Environment';
import { CreateEnvironment } from '../models/requests/CreateEnvironment';
import { DefaultResponse } from '../models/response/DefaultResponse';

export class EnvironmentRequests extends BaseRequests {
  private axios: AxiosInstance;

  public constructor(axiosInstance: AxiosInstance) {
    super();
    this.axios = axiosInstance;
  }

  public createEnvironment(request: CreateEnvironment): Promise<Environment> {
    return this.axios.post<Environment>(`environment`, request)
      .then((response: AxiosResponse<Environment>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      })
  }

  public getEnvironment(environmentId: string): Promise<Environment> {
    return this.axios.get<Environment>(`environment/${environmentId}`)
      .then((response: AxiosResponse<Environment> ) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

  public getEnvironments(): Promise<Environment[]> {
    return this.axios.get<Environment[]>(`environment`)
      .then((response: AxiosResponse<Environment[]>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

  public deleteEnvironment(environmentId: string): Promise<DefaultResponse> {
    return this.axios.delete<DefaultResponse>(`environment/${environmentId}`)
      .then((response: AxiosResponse<DefaultResponse>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      })
  }

  public updateEnvironment(environmentId: string, name: string): Promise<Environment> {
    return this.axios.put<Environment>(`environment/${environmentId}`, {
        name,
      })
      .then((response: AxiosResponse<Environment>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }
}
