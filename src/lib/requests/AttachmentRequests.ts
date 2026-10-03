import { AxiosInstance } from 'axios';
import { BaseRequests } from './BaseRequests';
import FormData from 'form-data';
import { Attachment } from '../models/manual/Attachment';
import { TestAttachment } from '../models/TestAttachment';
import { AttachmentsResponse } from '../models/response/ManualResponses';
import { DefaultResponse } from '../models/response/DefaultResponse';

/**
 * Exactly one owner must be supplied. For listing, `executionId` returns the files an
 * automated execution claimed and `buildId` every file uploaded against a build.
 */
export interface AttachmentOwner {
  testCaseId?: string;
  sharedStepId?: string;
  executionId?: string;
  buildId?: string;
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

  /**
   * Uploads a file from disk that an automated test produced - a console log, HAR file,
   * video, Playwright trace, HTML snapshot or image - against the build the test is running
   * in. Node only (reads the file with `fs`).
   *
   * The server decides the kind from the file extension, so keep the real one. List the
   * returned id on the execution, or a step, when saving it; AnglesReporter.attachFile does
   * both for you.
   */
  public uploadTestAttachment(buildId: string, filePath: string, fileName?: string): Promise<TestAttachment> {
    const path = require('path');
    const fs = require('fs');
    const fullPath = path.resolve(filePath);
    return this.uploadTestAttachmentData(buildId, fs.createReadStream(fullPath), fileName || path.basename(fullPath));
  }

  /**
   * Uploads in-memory content as a test attachment, e.g. `await page.content()` as
   * "page.html" or a screenshot buffer as "failure.png". Node only. `fileName` is required:
   * its extension decides the kind.
   */
  public uploadTestAttachmentData(
    buildId: string,
    data: Buffer | string | NodeJS.ReadableStream,
    fileName: string,
  ): Promise<TestAttachment> {
    const formData = new FormData();
    formData.append('attachment', data, fileName);
    return this.post<TestAttachment>(`build/${buildId}/attachment`, formData, {
      headers: formData.getHeaders(),
      // Videos and traces can be large; let the server's limit decide.
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });
  }

  public getAttachments(owner: AttachmentOwner): Promise<AttachmentsResponse> {
    const params: any = {};
    if (owner.testCaseId) params.testCaseId = owner.testCaseId;
    if (owner.sharedStepId) params.sharedStepId = owner.sharedStepId;
    if (owner.executionId) params.executionId = owner.executionId;
    if (owner.buildId) params.buildId = owner.buildId;
    return this.get<AttachmentsResponse>('attachment', { params });
  }

  public getAttachment(attachmentId: string): Promise<Attachment> {
    return this.get<Attachment>(`attachment/${attachmentId}`);
  }

  /**
   * Joins the configured baseURL to a path, tolerating either spelling of the boundary.
   *
   * `baseURL` is configured by the consuming application and both spellings are in the
   * wild - angles-ui sets ".../rest/api/v1.0" with no trailing slash, while other callers
   * include one. Concatenating blindly produces ".../v1.0attachment/<id>/thumbnail",
   * which the router cannot match and returns as a 404. Relative request URLs never hit
   * this because axios resolves those itself; only the URLs built here, for use as an
   * <img src>, have to do the joining.
   */
  private absoluteUrl(path: string): string {
    const base = this.axios.defaults.baseURL || '';
    if (!base) return path;
    return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
  }

  /**
   * The URL of the full-size image. Returned rather than fetched so it can be used
   * directly as an <img src>, which is how the markdown `attachment:<id>` references in a
   * step's expected result are resolved.
   */
  public getAttachmentUrl(attachmentId: string): string {
    return this.absoluteUrl(`attachment/${attachmentId}/file`);
  }

  /** The thumbnail URL. Falls back to the original server-side, so it never 404s. */
  public getThumbnailUrl(attachmentId: string): string {
    return this.absoluteUrl(`attachment/${attachmentId}/thumbnail`);
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
