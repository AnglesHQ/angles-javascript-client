import { AxiosInstance } from 'axios';
import { BaseRequests } from './BaseRequests';
import { Team } from '../models/Team';
import { CreateTeam } from '../models/requests/CreateTeam';
import { DefaultResponse } from '../models/response/DefaultResponse';

export class TeamRequests extends BaseRequests {

  public constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance);
  }

  /**
   * Will create a team based on the details provided.
   *
   * @param {CreateTeam} request - contains the details for the team you want to create.
   */
  public createTeam(request: CreateTeam): Promise<Team> {
    return this.post<Team>(`team`, request);
  }

  /**
   * Retrieves all the available teams.
   */
  public getTeams(): Promise<Team[]> {
    return this.get<Team[]>(`team`);
  }

  /**
   * Retrieves a specific team based on teh id.
   * @param {string} teamId - id of the team you want to retrieve.
   */
  public getTeam(teamId: string): Promise<Team> {
    return this.get<Team>(`team/${teamId}`);
  }

  /**
   * Before calling this function please make sure you clear all the builds using the
   * delete builds method (e.g. with age 0). That will delete all builds, executions and screenshots.
   *
   * @param {string} teamId - id of the team you want to delete.
   */
  public deleteTeam(teamId: string): Promise<DefaultResponse> {
    return this.delete<DefaultResponse>(`team/${teamId}`);
  }

  /**
   * This function allows you to update the team name.
   *
   * @param {string} teamId - id of the team you want to update
   * @param {string} name - new name you want to set for the team
   */
  public updateTeam(teamId: string, name: string): Promise<Team> {
    return this.put<Team>(`team/${teamId}`, {
      name,
    });
  }

  /**
   * Components allow you to "group" your test coverage by area of functionality/application.
   * This function allows you to add components to your team.
   *
   * @param {string} teamId - id of the team you want to add components to.
   * @param {string[]} components - list of components you want to add.
   */
  public addComponentsToTeam(teamId: string, components: string[]): Promise<Team> {
    return this.put<Team>(`team/${teamId}`, {
      components,
    });
  }

}
