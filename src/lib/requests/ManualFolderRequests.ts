import { AxiosInstance } from 'axios';
import { BaseRequests } from './BaseRequests';
import { ManualFolder } from '../models/manual/ManualFolder';
import { CreateManualFolder } from '../models/requests/CreateManualFolder';
import { MoveManualTestCases } from '../models/requests/MoveManualTestCases';
import { ManualFoldersResponse, MoveTestCasesResponse } from '../models/response/ManualResponses';
import { DefaultResponse } from '../models/response/DefaultResponse';

export class ManualFolderRequests extends BaseRequests {

  public constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance);
  }

  public createFolder(request: CreateManualFolder): Promise<ManualFolder> {
    return this.post<ManualFolder>('manual-folder', request);
  }

  /**
   * The team's whole folder tree, nested, with a test case count on each folder and a
   * count of the cases that are not filed anywhere.
   */
  public getFolders(teamId: string): Promise<ManualFoldersResponse> {
    return this.get<ManualFoldersResponse>('manual-folder', { params: { teamId } });
  }

  public getFolder(folderId: string): Promise<ManualFolder> {
    return this.get<ManualFolder>(`manual-folder/${folderId}`);
  }

  /**
   * Renames a folder and/or re-parents it. Moving takes the whole subtree along.
   * Pass `parent: null` to move the folder to the team root.
   */
  public updateFolder(folderId: string, request: Partial<CreateManualFolder>): Promise<ManualFolder> {
    return this.put<ManualFolder>(`manual-folder/${folderId}`, request);
  }

  /**
   * Deletes an empty folder. Rejected with a 409 while it still holds test cases or
   * sub-folders, so nothing is re-parented or removed by accident.
   */
  public deleteFolder(folderId: string): Promise<DefaultResponse> {
    return this.delete<DefaultResponse>(`manual-folder/${folderId}`);
  }

  /**
   * Files test cases into a folder, or back to the root with a null folder.
   *
   * Filing is organisation rather than content, so this does not create a new test case
   * version - it is recorded in the change history instead.
   */
  public moveTestCases(request: MoveManualTestCases): Promise<MoveTestCasesResponse> {
    return this.put<MoveTestCasesResponse>('manual-folder/move', request);
  }
}
