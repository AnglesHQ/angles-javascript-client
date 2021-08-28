import { AxiosResponse, AxiosInstance } from 'axios';
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

  public async createBuild(request: CreateBuild): Promise<Build> {
    const response: AxiosResponse<Build> = await this.axios.post<Build>(`build`, request);
    return this.success(response);
  }

  /**
   * This function allows you to retrieve the builds for a specific team and also allows you to specify
   * which builds and if you want to include the execution details.
   *
   * @param {string} teamId
   * @param {string[]=} buildIds
   * @param {boolean} [returnExecutionDetails=false]
   */
  public async getBuilds(teamId:string, buildIds: string[], returnExecutionDetails: boolean): Promise<BuildsResponse> {
    let requestPath = `/build?teamId=${teamId}`;
    if (buildIds) requestPath += `&buildIds=${buildIds.join(',')}`;
    if (returnExecutionDetails) requestPath += `&returnExecutionDetails=${returnExecutionDetails}`;
    const response: AxiosResponse<BuildsResponse> = await this.axios.get<BuildsResponse>(requestPath);
    return this.success(response);
  }

  public async getBuildsWithFilters(teamId:string, filterEnvironments: string[], filterComponents: string[], skip: number, limit:number): Promise<BuildsResponse> {
    let params:any = {
      teamId,
      skip,
      limit,
    };
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
    const response: AxiosResponse<BuildsResponse> = await this.axios.get<BuildsResponse>('/build', {
      params,
    });
    return this.success(response);
  }

  public async getBuildsWithDateFilters(teamId:string, filterEnvironments: string[], filterComponents: string[], skip: number, limit:number, fromDate: Date, toDate: Date): Promise<BuildsResponse> {
    let params:any = {
      teamId,
      skip,
      limit,
      fromDate: moment(fromDate).format('YYYY-MM-DD'),
      toDate: moment(toDate).format('YYYY-MM-DD'),
    };
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
    const response: AxiosResponse<BuildsResponse> = await this.axios.get<BuildsResponse>('/build', {
      params,
    });
    return this.success(response);
  }
  /**
   * This function will remove builds by age (including executions and screenshots).
   * NOTE: this can not be reversed, once deleted all builds and assets will have been removed.
   *
   * @param {string} teamId - id of the team you want to remove the builds for.
   * @param {number} ageInDays - age in number of days you want to remove the builds for. e.g. 90 will
   * remove any builds over 90 days old.
   */
  public async deleteBuilds(teamId: string, ageInDays: number): Promise<DefaultResponse> {
    const response: AxiosResponse<DefaultResponse> = await this.axios.delete<DefaultResponse>(`build`, {
      params: {
        teamId,
        ageInDays,
      }
    });
    return this.success(response);
  }

  public async getBuild(buildId: string): Promise<Build> {
    const response: AxiosResponse<Build> = await this.axios.get<Build>(`build/${buildId}`);
    return this.success(response);
  }

  public async deleteBuild(buildId: string): Promise<DefaultResponse> {
    const response: AxiosResponse<DefaultResponse> = await this.axios.delete<DefaultResponse>(`build/${buildId}`);
    return this.success(response);
  }

  // TODO: Update build

  public async setKeep(buildId: string, keep: boolean): Promise<Build> {
    const response: AxiosResponse<Build> = await this.axios.put<Build>(`build/${buildId}/keep`, { keep });
    return this.success(response);
  }

  public async addArtifacts(buildId: string, artifacts: Artifact[]): Promise<Build> {
    const response: AxiosResponse<Build> = await this.axios.put<Build>(
      `build/${buildId}/artifacts`,
      {
        artifacts,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return this.success(response);
  }

}
