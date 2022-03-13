import { AxiosInstance } from 'axios';
import { BaseRequests } from './BaseRequests';
import { Execution } from '../models/Execution';
import { CreateExecution } from '../models/requests/CreateExecution';
import { ExecutionResponse } from '../models/response/ExecutionResponse';
import {DefaultResponse} from "../models/response/DefaultResponse";

export class ExecutionRequests extends BaseRequests {

  public constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance);
  }

  public saveExecution(saveExecutionRequest: CreateExecution): Promise<Execution> {
    return this.post<Execution>(`execution/`, saveExecutionRequest);
  }

  // TODO: Get executions (with buildId or executionIds)

  public getExecution(executionId: string): Promise<Execution> {
    return this.get<Execution>(`execution/${executionId}`);
  }

  public deleteExecution(executionId: string): Promise<DefaultResponse> {
    return this.delete<DefaultResponse>(`execution/${executionId}`);
  }
  // TODO: Update execution

  public getExecutionHistory(executionId: string, skip: number, limit: number): Promise<ExecutionResponse> {
    return this.get<ExecutionResponse>(`execution/${executionId}/history?&skip=${skip}&limit=${limit}`);
  }

  // TODO: Update execution with platforms
}
