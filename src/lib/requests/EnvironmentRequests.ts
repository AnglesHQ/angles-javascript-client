import { AxiosResponse, AxiosInstance } from 'axios';
import { BaseRequests } from './BaseRequests';
import { Environment } from '../models/Types';

export class EnvironmentRequests extends BaseRequests {

  private axios: AxiosInstance;

  public constructor (axiosInstance: AxiosInstance) {
    super();
    this.axios = axiosInstance;
  }

  public async getEnvironment(environmentId:string): Promise<Environment> {
    const response: AxiosResponse<Environment> = await this.axios.get<Environment>(`environment/${environmentId}`);
    return this.success(response);
  }

  public async getEnvironments(): Promise<Environment[]> {
    const response: AxiosResponse<Environment[]> = await this.axios.get<Environment[]>(`environment`);
    return this.success(response);
  }
}
