import { AxiosInstance } from 'axios';
import { BaseRequests } from './BaseRequests';
import { CustomFieldDefinition } from '../models/manual/CustomFieldDefinition';
import { CreateCustomField } from '../models/requests/CreateCustomField';
import {
  CustomFieldsResponse,
  CustomFieldDeleteResponse,
} from '../models/response/ManualResponses';

export class CustomFieldRequests extends BaseRequests {

  public constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance);
  }

  /** Admin only. */
  public createCustomField(request: CreateCustomField): Promise<CustomFieldDefinition> {
    return this.post<CustomFieldDefinition>('custom-field', request);
  }

  /** Readable by any team member - the authoring form needs the definitions. */
  public getCustomFields(teamId: string, includeArchived: boolean = false, appliesTo?: string): Promise<CustomFieldsResponse> {
    const params: any = { teamId };
    if (includeArchived) params.includeArchived = true;
    if (appliesTo) params.appliesTo = appliesTo;
    return this.get<CustomFieldsResponse>('custom-field', { params });
  }

  public getCustomField(fieldId: string): Promise<CustomFieldDefinition> {
    return this.get<CustomFieldDefinition>(`custom-field/${fieldId}`);
  }

  /**
   * Admin only. The key can never change; the type and in-use options cannot change while
   * test cases hold values for them.
   */
  public updateCustomField(fieldId: string, request: Partial<CreateCustomField>): Promise<CustomFieldDefinition> {
    return this.put<CustomFieldDefinition>(`custom-field/${fieldId}`, request);
  }

  /**
   * Admin only. A field in use anywhere is archived rather than deleted, so historical
   * values keep the label and type needed to render them - check `archived` on the result.
   */
  public deleteCustomField(fieldId: string): Promise<CustomFieldDeleteResponse> {
    return this.delete<CustomFieldDeleteResponse>(`custom-field/${fieldId}`);
  }

}
