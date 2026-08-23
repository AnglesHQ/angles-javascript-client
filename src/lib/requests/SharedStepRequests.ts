import { AxiosInstance } from 'axios';
import { BaseRequests } from './BaseRequests';
import { SharedStep } from '../models/manual/SharedStep';
import { CreateSharedStep } from '../models/requests/CreateSharedStep';
import {
  SharedStepsResponse,
  SharedStepUsageResponse,
  SharedStepUpdateResponse,
  ManualChangeHistoryResponse,
} from '../models/response/ManualResponses';
import { DefaultResponse } from '../models/response/DefaultResponse';

export class SharedStepRequests extends BaseRequests {

  public constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance);
  }

  public createSharedStep(request: CreateSharedStep): Promise<SharedStep> {
    return this.post<SharedStep>('shared-step', request);
  }

  public getSharedSteps(teamId: string, search?: string, limit?: number, skip?: number): Promise<SharedStepsResponse> {
    const params: any = { teamId };
    if (search) params.search = search;
    if (limit !== undefined) params.limit = limit;
    if (skip !== undefined) params.skip = skip;
    return this.get<SharedStepsResponse>('shared-step', { params });
  }

  public getSharedStep(sharedStepId: string): Promise<SharedStep> {
    return this.get<SharedStep>(`shared-step/${sharedStepId}`);
  }

  /**
   * Lists the test cases including this shared step - how many an edit will re-version,
   * and which ones block a delete. Worth calling before either.
   */
  public getUsage(sharedStepId: string): Promise<SharedStepUsageResponse> {
    return this.get<SharedStepUsageResponse>(`shared-step/${sharedStepId}/usage`);
  }

  /**
   * Updates the shared step. Changing its steps re-versions every referencing test case;
   * the response's `cascade` reports how many. Renaming cascades to nothing.
   */
  public updateSharedStep(sharedStepId: string, request: Partial<CreateSharedStep>): Promise<SharedStepUpdateResponse> {
    return this.put<SharedStepUpdateResponse>(`shared-step/${sharedStepId}`, request);
  }

  public deleteSharedStep(sharedStepId: string): Promise<DefaultResponse> {
    return this.delete<DefaultResponse>(`shared-step/${sharedStepId}`);
  }

  public getHistory(sharedStepId: string, limit?: number, skip?: number): Promise<ManualChangeHistoryResponse> {
    const params: any = {};
    if (limit !== undefined) params.limit = limit;
    if (skip !== undefined) params.skip = skip;
    return this.get<ManualChangeHistoryResponse>(`shared-step/${sharedStepId}/history`, { params });
  }

}
