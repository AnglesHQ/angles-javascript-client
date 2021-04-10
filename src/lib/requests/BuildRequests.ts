import { AxiosResponse, AxiosInstance } from 'axios';
import { BaseRequests } from './BaseRequests';
import { Artifact, Build } from '../models/Types';
import { CreateBuild } from '../models/RequestTypes';

export class BuildRequests extends BaseRequests {

  private axios: AxiosInstance;

  public constructor (axiosInstance: AxiosInstance) {
    super();
    this.axios = axiosInstance;
  }

  public async getBuild(buildId:string): Promise<Build> {
    const response: AxiosResponse<Build> = await this.axios.get<Build>(`build/${buildId}`);
    return this.success(response);
  }

  public async getBuilds(): Promise<Build[]> {
    const response: AxiosResponse<Build[]> = await this.axios.get<Build[]>(`build`);
    return this.success(response);
  }

  public async createBuild(request: CreateBuild): Promise<Build> {
    const response: AxiosResponse<Build> = await this.axios.post<Build>(`build`, request);
    return this.success(response);
  }

  public async addArtifacts(buildId: string, artifacts: Artifact[]): Promise<Build> {
    const response: AxiosResponse<Build> = await this.axios.put<Build>(`build/${buildId}/artifacts`, {
      artifacts: artifacts
    },  {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return this.success(response);
  }
}
