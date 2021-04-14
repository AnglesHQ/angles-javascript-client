import { AxiosResponse, AxiosInstance } from 'axios';
import { BaseRequests } from './BaseRequests';
import { Execution } from '../models/Execution';
import { CreateExecution } from '../models/requests/CreateExecution';

export class ExecutionRequests extends BaseRequests {
  private axios: AxiosInstance;

  public constructor(axiosInstance: AxiosInstance) {
    super();
    this.axios = axiosInstance;
  }

  public async getExecution(executionId: string): Promise<Execution> {
    const response: AxiosResponse<Execution> = await this.axios.get<Execution>(`execution/${executionId}`);
    return this.success(response);
  }

  public async saveExecution(saveExecutionRequest: CreateExecution): Promise<Execution> {
    const response: AxiosResponse<Execution> = await this.axios.post<Execution>(`execution/`, saveExecutionRequest);
    return this.success(response);
  }
}
