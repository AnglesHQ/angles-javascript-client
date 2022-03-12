import {AxiosResponse, AxiosInstance, AxiosError} from 'axios';
import { BaseRequests } from './BaseRequests';
import { CreateBuild } from '../models/requests/CreateBuild';
import { Build } from '../models/Build';
import { Artifact } from '../models/Artifact';
import { BuildsResponse } from '../models/response/BuildsResponse';
import { DefaultResponse } from '../models/response/DefaultResponse';
import moment from "moment";

export class BuildRequests extends BaseRequests {
  private axios: AxiosInstance;

  public constructor(axiosInstance: AxiosInstance) {
    super();
    this.axios = axiosInstance;
  }

  public createBuild(request: CreateBuild): Promise<Build> {
    return this.axios.post<Build>(`build`, request)
      .then((response: AxiosResponse<Build>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      })
  }

  /**
   * This function allows you to retrieve the builds for a specific team and also allows you to specify
   * which builds and if you want to include the execution details.
   *
   * @param {string} teamId
   * @param {string[]=} buildIds
   * @param {boolean} [returnExecutionDetails=false]
   */
  public getBuilds(teamId:string, buildIds: string[], returnExecutionDetails: boolean): Promise<BuildsResponse> {
    let requestPath = `/build?teamId=${teamId}`;
    if (buildIds) requestPath += `&buildIds=${buildIds.join(',')}`;
    if (returnExecutionDetails) requestPath += `&returnExecutionDetails=${returnExecutionDetails}`;
    return this.axios.get<BuildsResponse>(requestPath)
      .then((response: AxiosResponse<BuildsResponse>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

  public getBuildsWithFilters(teamId:string, filterEnvironments: string[], filterComponents: string[], skip: number, limit:number): Promise<BuildsResponse> {
    return this.getBuildsWithDateFilters(teamId, filterEnvironments, filterComponents, skip, limit, undefined, undefined);
  }

  public getBuildsWithDateFilters(teamId:string, filterEnvironments: string[], filterComponents: string[], skip: number, limit:number, fromDate: Date, toDate: Date): Promise<BuildsResponse> {
    let params:any = {
      teamId,
      skip,
      limit,
    };
    if (fromDate) { params = { fromDate: moment(fromDate).format('YYYY-MM-DD'), ...params }};
    if (toDate) { params = { toDate: moment(toDate).format('YYYY-MM-DD'), ...params }};
    if (filterEnvironments && filterEnvironments.length > 0) {
      params = {
        environmentIds: filterEnvironments.join(','),
        ...params,
      };
    }
    if (filterComponents && filterComponents.length > 0) {
      params = {
        componentIds: filterComponents.join(','),
        ...params,
      };
    }
    return this.axios.get<BuildsResponse>('/build', {
        params,
      })
      .then((response: AxiosResponse<BuildsResponse>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }
  /**
   * This function will remove builds by age (including executions and screenshots).
   * NOTE: this can not be reversed, once deleted all builds and assets will have been removed.
   *
   * @param {string} teamId - id of the team you want to remove the builds for.
   * @param {number} ageInDays - age in number of days you want to remove the builds for. e.g. 90 will
   * remove any builds over 90 days old.
   */
  public deleteBuilds(teamId: string, ageInDays: number): Promise<DefaultResponse> {
    return this.axios.delete<DefaultResponse>(`build`, {
        params: {
          teamId,
          ageInDays,
        }
      })
      .then((response: AxiosResponse<DefaultResponse>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

  public getBuild(buildId: string): Promise<Build> {
    return this.axios.get<Build>(`build/${buildId}`)
      .then((response: AxiosResponse<Build>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      })
  }

  public deleteBuild(buildId: string): Promise<DefaultResponse> {
    return this.axios.delete<DefaultResponse>(`build/${buildId}`)
      .then((response: AxiosResponse<DefaultResponse>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      })
  }

  // TODO: Update build

  public setKeep(buildId: string, keep: boolean): Promise<Build> {
    return this.axios.put<Build>(`build/${buildId}/keep`, { keep })
      .then((response: AxiosResponse<Build>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      })
  }

  public addArtifacts(buildId: string, artifacts: Artifact[]): Promise<Build> {
    return this.axios.put<Build>(`build/${buildId}/artifacts`,
  { artifacts },
 {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response: AxiosResponse<Build>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

}
