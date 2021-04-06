import { AxiosResponse, AxiosInstance } from 'axios';
import { BaseRequests } from './BaseRequests'
import { Team } from './types';

export class TeamRequests extends BaseRequests {

  private axios: AxiosInstance;

  public constructor (axiosInstance: AxiosInstance) {
    super();
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
}
