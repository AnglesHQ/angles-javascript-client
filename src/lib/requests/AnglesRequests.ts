import { AxiosInstance } from 'axios';
import { BaseRequests } from './BaseRequests';
import {Versions} from "../models/Versions";

export class AnglesRequests extends BaseRequests {

  public constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance);
  }

  public getVersions(): Promise<Versions> {
    return this.get<Versions>(`angles/versions`);
  }

}
