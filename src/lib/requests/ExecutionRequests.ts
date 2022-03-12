import {AxiosResponse, AxiosInstance, AxiosError} from 'axios';
import { BaseRequests } from './BaseRequests';
import { Execution } from '../models/Execution';
import { CreateExecution } from '../models/requests/CreateExecution';
import { ExecutionResponse } from '../models/response/ExecutionResponse';
import {DefaultResponse} from "../models/response/DefaultResponse";

export class ExecutionRequests extends BaseRequests {
  private axios: AxiosInstance;

  public constructor(axiosInstance: AxiosInstance) {
    super();
    this.axios = axiosInstance;
  }

  public saveExecution(saveExecutionRequest: CreateExecution): Promise<Execution> {
    return this.axios.post<Execution>(`execution/`, saveExecutionRequest)
      .then((response: AxiosResponse<Execution>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      })
  }

  // TODO: Get executions (with buildId or executionIds)

  public getExecution(executionId: string): Promise<Execution> {
    return this.axios.get<Execution>(`execution/${executionId}`)
      .then((response: AxiosResponse<Execution>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

  public deleteExecution(executionId: string): Promise<DefaultResponse> {
    return this.axios.delete<DefaultResponse>(`execution/${executionId}`)
      .then((response: AxiosResponse<DefaultResponse>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

  // TODO: Update execution

  public getExecutionHistory(executionId: string, skip: number, limit: number): Promise<ExecutionResponse> {
    return this.axios.get<ExecutionResponse>(`execution/${executionId}/history?&skip=${skip}&limit=${limit}`)
      .then((response: AxiosResponse<ExecutionResponse>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      })
  }

  // TODO: Update execution with platforms
}
