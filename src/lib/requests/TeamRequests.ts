import {AxiosResponse, AxiosInstance, AxiosError} from 'axios';
import { BaseRequests } from './BaseRequests';
import { Team } from '../models/Team';
import { CreateTeam } from '../models/requests/CreateTeam';
import { DefaultResponse } from '../models/response/DefaultResponse';

export class TeamRequests extends BaseRequests {
  private axios: AxiosInstance;

  public constructor(axiosInstance: AxiosInstance) {
    super();
    this.axios = axiosInstance;
  }

  /**
   * Will create a team based on the details provided.
   *
   * @param {CreateTeam} request - contains the details for the team you want to create.
   */
  public createTeam(request: CreateTeam): Promise<Team> {
    return this.axios.post<Team>(`team`, request)
      .then((response: AxiosResponse<Team>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

  /**
   * Retrieves all the available teams.
   */
  public getTeams(): Promise<Team[]> {
    return this.axios.get<Team[]>(`team`)
      .then((response: AxiosResponse<Team[]>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

  /**
   * Retrieves a specific team based on teh id.
   * @param {string} teamId - id of the team you want to retrieve.
   */
  public getTeam(teamId: string): Promise<Team> {
    return this.axios.get<Team>(`team/${teamId}`)
      .then((response: AxiosResponse<Team>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

  /**
   * Before calling this function please make sure you clear all the builds using the
   * delete builds method (e.g. with age 0). That will delete all builds, executions and screenshots.
   *
   * @param {string} teamId - id of the team you want to delete.
   */
  public async deleteTeam(teamId: string): Promise<DefaultResponse> {
    return this.axios.delete<DefaultResponse>(`team/${teamId}`)
      .then((response: AxiosResponse<DefaultResponse>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

  /**
   * This function allows you to update the team name.
   *
   * @param {string} teamId - id of the team you want to update
   * @param {string} name - new name you want to set for the team
   */
  public async updateTeam(teamId: string, name: string): Promise<Team> {
    return this.axios.put<Team>(`team/${teamId}`, {
        name,
      })
      .then((response: AxiosResponse<Team>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

  /**
   * Components allow you to "group" your test coverage by area of functionality/application.
   * This function allows you to add components to your team.
   *
   * @param {string} teamId - id of the team you want to add components to.
   * @param {string[]} components - list of components you want to add.
   */
  public async addComponentsToTeam(teamId: string, components: string[]): Promise<Team> {
    return this.axios.put<Team>(`team/${teamId}`, {
      components,
    })
      .then((response: AxiosResponse<Team>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

}
