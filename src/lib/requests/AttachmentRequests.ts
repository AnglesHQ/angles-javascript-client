import { AxiosInstance } from 'axios';
import { BaseRequests } from './BaseRequests';
import { Attachment } from '../models/manual/Attachment';
import { AttachmentsResponse } from '../models/response/ManualResponses';
import { DefaultResponse } from '../models/response/DefaultResponse';

/** Exactly one owner must be supplied. */
export interface AttachmentOwner {
  testCaseId?: string;
  sharedStepId?: string;
  executionId?: string;
}

export class AttachmentRequests extends BaseRequests {

  public constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance);
  }

  /**
   * Uploads an image from the browser.
   *
   * Takes a File/Blob and builds a native FormData, unlike ScreenshotRequests.saveScreenshot
   * which reads from disk with `fs` and is therefore Node-only. Attachments are captured by
   * a QA in the browser, so that path is unusable here. The Content-Type header is
   * deliberately not set: the browser has to add its own multipart boundary.
   */
  public uploadAttachment(file: Blob, owner: AttachmentOwner, fileName?: string): Promise<Attachment> {
    const formData = new FormData();
    if (owner.testCaseId) formData.append('testCaseId', owner.testCaseId);
    if (owner.sharedStepId) formData.append('sharedStepId', owner.sharedStepId);
    if (owner.executionId) formData.append('executionId', owner.executionId);
    if (fileName) {
      formData.append('attachment', file, fileName);
    } else {
      formData.append('attachment', file);
    }
    return this.post<Attachment>('attachment', formData);
  }

  public getAttachments(owner: AttachmentOwner): Promise<AttachmentsResponse> {
    const params: any = {};
    if (owner.testCaseId) params.testCaseId = owner.testCaseId;
    if (owner.sharedStepId) params.sharedStepId = owner.sharedStepId;
    return this.get<AttachmentsResponse>('attachment', { params });
  }

  public getAttachment(attachmentId: string): Promise<Attachment> {
    return this.get<Attachment>(`attachment/${attachmentId}`);
  }

  /**
   * The URL of the full-size image. Returned rather than fetched so it can be used
   * directly as an <img src>, which is how the markdown `attachment:<id>` references in a
   * step's expected result are resolved.
   */
  public getAttachmentUrl(attachmentId: string): string {
    return `${this.axios.defaults.baseURL || ''}attachment/${attachmentId}/file`;
  }

  /** The thumbnail URL. Falls back to the original server-side, so it never 404s. */
  public getThumbnailUrl(attachmentId: string): string {
    return `${this.axios.defaults.baseURL || ''}attachment/${attachmentId}/thumbnail`;
  }

  /**
   * Deletes an attachment. Rejected with 409 while any frozen test case version still
   * references it - the file is the only copy of what that version's tester saw. Remove
   * the image from the test case instead.
   */
  public deleteAttachment(attachmentId: string): Promise<DefaultResponse> {
    return this.delete<DefaultResponse>(`attachment/${attachmentId}`);
  }

}
