import {AxiosResponse, AxiosInstance, AxiosError} from 'axios';
import { BaseRequests } from './BaseRequests';
import {Versions} from "../models/Versions";

export class AnglesRequests extends BaseRequests {
  private axios: AxiosInstance;

  public constructor(axiosInstance: AxiosInstance) {
    super();
    this.axios = axiosInstance;
  }

  public getVersions(): Promise<Versions> {
    return this.axios.get<Versions>(`angles/versions`)
      .then((response: AxiosResponse<Versions>) => {
        return this.success(response)
      })
      .catch((error: AxiosError)=> {
        return Promise.reject(error);
      });
  }

}
