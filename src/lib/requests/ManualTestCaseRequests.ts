import { AxiosInstance } from 'axios';
import { BaseRequests } from './BaseRequests';
import { ManualTestCase } from '../models/manual/ManualTestCase';
import { ManualTestCaseVersion } from '../models/manual/ManualTestCaseVersion';
import { CreateManualTestCase } from '../models/requests/CreateManualTestCase';
import {
  ManualTestCasesResponse,
  ManualTestCaseVersionsResponse,
  ManualChangeHistoryResponse,
} from '../models/response/ManualResponses';
import { DefaultResponse } from '../models/response/DefaultResponse';

export interface ManualTestCaseFilters {
  status?: string[];
  priority?: string[];
  tags?: string[];
  search?: string;
  limit?: number;
  skip?: number;
}

export class ManualTestCaseRequests extends BaseRequests {

  public constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance);
  }

  public createTestCase(request: CreateManualTestCase): Promise<ManualTestCase> {
    return this.post<ManualTestCase>('manual-test-case', request);
  }

  public getTestCases(teamId: string, filters: ManualTestCaseFilters = {}): Promise<ManualTestCasesResponse> {
    const params: any = { teamId };
    if (filters.status && filters.status.length > 0) params.status = filters.status.join(',');
    if (filters.priority && filters.priority.length > 0) params.priority = filters.priority.join(',');
    if (filters.tags && filters.tags.length > 0) params.tags = filters.tags.join(',');
    if (filters.search) params.search = filters.search;
    if (filters.limit !== undefined) params.limit = filters.limit;
    if (filters.skip !== undefined) params.skip = filters.skip;
    return this.get<ManualTestCasesResponse>('manual-test-case', { params });
  }

  /**
   * Retrieves the mutable head.
   *
   * @param {boolean} [expand=false] resolve shared-step placeholders into the steps a
   * tester would actually follow. This is a preview of what the next frozen version will
   * contain, not a substitute for reading a version.
   */
  public getTestCase(caseId: string, expand: boolean = false): Promise<ManualTestCase> {
    const params: any = {};
    if (expand) params.expand = true;
    return this.get<ManualTestCase>(`manual-test-case/${caseId}`, { params });
  }

  public updateTestCase(caseId: string, request: Partial<CreateManualTestCase>): Promise<ManualTestCase> {
    return this.put<ManualTestCase>(`manual-test-case/${caseId}`, request);
  }

  public cloneTestCase(caseId: string, title?: string, comment?: string): Promise<ManualTestCase> {
    return this.post<ManualTestCase>(`manual-test-case/${caseId}/clone`, { title, comment });
  }

  public deleteTestCase(caseId: string): Promise<DefaultResponse> {
    return this.delete<DefaultResponse>(`manual-test-case/${caseId}`);
  }

  public getVersions(caseId: string): Promise<ManualTestCaseVersionsResponse> {
    return this.get<ManualTestCaseVersionsResponse>(`manual-test-case/${caseId}/version`);
  }

  /**
   * Retrieves the frozen content of one version - what an execution recorded against that
   * version renders, unaffected by any later edit to the test case.
   */
  public getVersion(caseId: string, version: number): Promise<ManualTestCaseVersion> {
    return this.get<ManualTestCaseVersion>(`manual-test-case/${caseId}/version/${version}`);
  }

  public getHistory(caseId: string, limit?: number, skip?: number): Promise<ManualChangeHistoryResponse> {
    const params: any = {};
    if (limit !== undefined) params.limit = limit;
    if (skip !== undefined) params.skip = skip;
    return this.get<ManualChangeHistoryResponse>(`manual-test-case/${caseId}/history`, { params });
  }

}
