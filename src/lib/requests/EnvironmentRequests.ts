import { AxiosInstance } from 'axios';
import { BaseRequests } from './BaseRequests';
import { Environment } from '../models/Environment';
import { CreateEnvironment } from '../models/requests/CreateEnvironment';
import { DefaultResponse } from '../models/response/DefaultResponse';

export class EnvironmentRequests extends BaseRequests {

  public constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance);
  }

  public createEnvironment(request: CreateEnvironment): Promise<Environment> {
    return this.post<Environment>(`environment`, request);
  }

  public getEnvironment(environmentId: string): Promise<Environment> {
    return this.get<Environment>(`environment/${environmentId}`);
  }

  public getEnvironments(): Promise<Environment[]> {
    return this.get<Environment[]>(`environment`);
  }

  public deleteEnvironment(environmentId: string): Promise<DefaultResponse> {
    return this.delete<DefaultResponse>(`environment/${environmentId}`);
  }

  public updateEnvironment(environmentId: string, name: string): Promise<Environment> {
    return this.put<Environment>(`environment/${environmentId}`, {
      name,
    });
  }
}
