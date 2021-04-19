import { AxiosResponse, AxiosInstance } from 'axios';
import { BaseRequests } from './BaseRequests';
import { Execution } from '../models/Execution';
import { CreateExecution } from '../models/requests/CreateExecution';
import { ExecutionResponse } from '../models/response/ExecutionResponse';

export class ExecutionRequests extends BaseRequests {
  private axios: AxiosInstance;

  public constructor(axiosInstance: AxiosInstance) {
    super();
    this.axios = axiosInstance;
  }

  public async saveExecution(saveExecutionRequest: CreateExecution): Promise<Execution> {
    const response: AxiosResponse<Execution> = await this.axios.post<Execution>(`execution/`, saveExecutionRequest);
    return this.success(response);
  }

  // TODO: Get executions (with buildId or executionIds)

  public async getExecution(executionId: string): Promise<Execution> {
    const response: AxiosResponse<Execution> = await this.axios.get<Execution>(`execution/${executionId}`);
    return this.success(response);
  }

  // TODO: Delete execution

  // TODO: Update execution

  public async getExecutionHistory(executionId: string, skip: number, limit: number): Promise<ExecutionResponse> {
    const response: AxiosResponse<ExecutionResponse> = await this.axios.get<ExecutionResponse>(`execution/${executionId}/history?&skip=${skip}&limit=${limit}`);
    return this.success(response);
  }

  // TODO: Update execution with platforms
}
