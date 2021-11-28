import { AxiosResponse, AxiosInstance } from 'axios';
import { BaseRequests } from './BaseRequests';
import {Versions} from "../models/Versions";

export class AnglesRequests extends BaseRequests {
  private axios: AxiosInstance;

  public constructor(axiosInstance: AxiosInstance) {
    super();
    this.axios = axiosInstance;
  }

  public async getVersions(): Promise<Versions> {
    const response: AxiosResponse<Versions> = await this.axios.get<Versions>(`angles/versions`);
    return this.success(response);
  }

}
