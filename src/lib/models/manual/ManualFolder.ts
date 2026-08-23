/**
 * A folder in a team's manual test case tree.
 *
 * `path` holds the ancestor ids outermost first and never the folder itself, so a root
 * folder has an empty path and `depth` 0. `children` is populated by the tree endpoint,
 * which returns the whole structure nested rather than flat.
 */
export class ManualFolder {
  _id: string;
  team: string;
  name: string;
  description?: string;
  parent?: string | null;
  path?: string[];
  depth?: number;
  /** Test cases filed directly in this folder, not counting its sub-folders. */
  testCaseCount?: number;
  children?: ManualFolder[];
  /** Present on a single-folder fetch: everything held in this folder's whole subtree. */
  subFolderCount?: number;
  createdBy?: any;
  updatedBy?: any;
  createdAt?: Date;
  updatedAt?: Date;
}
