import { AxiosResponse, AxiosInstance } from 'axios';
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

  public async createEnvironment(request: CreateEnvironment): Promise<Environment> {
    const response: AxiosResponse<Environment> = await this.axios.post<Environment>(`environment`, request);
    return this.success(response);
  }

  public async getEnvironment(environmentId: string): Promise<Environment> {
    const response: AxiosResponse<Environment> = await this.axios.get<Environment>(`environment/${environmentId}`);
    return this.success(response);
  }

  public async getEnvironments(): Promise<Environment[]> {
    const response: AxiosResponse<Environment[]> = await this.axios.get<Environment[]>(`environment`);
    return this.success(response);
  }

  public async deleteEnvironment(environmentId: string): Promise<DefaultResponse> {
    const response: AxiosResponse<DefaultResponse> = await this.axios.delete<DefaultResponse>(`environment/${environmentId}`);
    return this.success(response);
  }

  public async updateEnvironment(environmentId: string, name: string): Promise<Environment> {
    const response: AxiosResponse<Environment> = await this.axios.put<Environment>(`environment/${environmentId}`, {
      name,
    });
    return this.success(response);
  }
}
