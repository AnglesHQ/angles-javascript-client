import { AxiosInstance } from 'axios';
import { BaseRequests } from './BaseRequests';
import { ManualTestRun } from '../models/manual/ManualTestRun';
import { CreateManualTestRun } from '../models/requests/CreateManualTestRun';
import { RecordManualResult } from '../models/requests/RecordManualResult';
import { ManualRunStates } from '../models/enum/ManualRunStates';
import { ManualTestRunsResponse } from '../models/response/ManualResponses';
import { DefaultResponse } from '../models/response/DefaultResponse';

export class ManualTestRunRequests extends BaseRequests {

  public constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance);
  }

  /**
   * Creates the run and the manual-tagged build its results are written into. Each
   * selected case is bound to its current frozen version.
   */
  public createTestRun(request: CreateManualTestRun): Promise<ManualTestRun> {
    return this.post<ManualTestRun>('manual-test-run', request);
  }

  public getTestRuns(teamId: string, status?: string[], assignedTo?: string, limit?: number, skip?: number): Promise<ManualTestRunsResponse> {
    const params: any = { teamId };
    if (status && status.length > 0) params.status = status.join(',');
    if (assignedTo) params.assignedTo = assignedTo;
    if (limit !== undefined) params.limit = limit;
    if (skip !== undefined) params.skip = skip;
    return this.get<ManualTestRunsResponse>('manual-test-run', { params });
  }

  /**
   * @param {boolean} [expand=false] include each case's bound frozen version - the steps
   * the tester should follow. The execution view needs this; the list view does not.
   */
  public getTestRun(runId: string, expand: boolean = false): Promise<ManualTestRun> {
    const params: any = {};
    if (expand) params.expand = true;
    return this.get<ManualTestRun>(`manual-test-run/${runId}`, { params });
  }

  public updateTestRun(runId: string, request: Partial<CreateManualTestRun>): Promise<ManualTestRun> {
    return this.put<ManualTestRun>(`manual-test-run/${runId}`, request);
  }

  /**
   * Records one case's result, writing a manual execution into the run's build so it
   * counts on the dashboards. Re-recording updates that execution rather than adding one.
   */
  public recordResult(runId: string, caseId: string, request: RecordManualResult): Promise<ManualTestRun> {
    return this.put<ManualTestRun>(`manual-test-run/${runId}/test-case/${caseId}/result`, request);
  }

  /**
   * Moves a not-yet-run case onto the latest version of its test case. Refused with a 409
   * once a result exists - that would re-point an execution at content it never ran.
   */
  public rebindTestCase(runId: string, caseId: string): Promise<ManualTestRun> {
    return this.put<ManualTestRun>(`manual-test-run/${runId}/test-case/${caseId}/rebind`, {});
  }

  public updateStatus(runId: string, status: ManualRunStates): Promise<ManualTestRun> {
    return this.put<ManualTestRun>(`manual-test-run/${runId}/status`, { status });
  }

  /** Removes the run along with its backing build and executions. Team lead access. */
  public deleteTestRun(runId: string): Promise<DefaultResponse> {
    return this.delete<DefaultResponse>(`manual-test-run/${runId}`);
  }

}
