import { AxiosResponse, AxiosInstance } from 'axios';
import { Team } from './types';

export class TeamRequests {

  private axios: AxiosInstance;

  public constructor (axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  public async getTeam(teamId: string): Promise<Team> {
    const response: AxiosResponse<Team> = await this.axios.get<Team>(`team/${teamId}`);
    return this.success(response);
  }

  public async getTeams(): Promise<Team[]> {
    const response: AxiosResponse<Team[]> = await this.axios.get<Team[]>(`team`);
    return this.success(response);
  }

  public success<T>(response: AxiosResponse<T>): T {
    return response.data;
  }
}
