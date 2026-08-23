import { ManualStep } from './ManualStep';
import { ManualTestCaseStates } from '../enum/ManualTestCaseStates';
import { ManualTestCasePriorities } from '../enum/ManualTestCasePriorities';
import { Team } from '../Team';

/**
 * The mutable head of a manual test case - always the latest content. Every version that
 * has existed is also stored immutably; executions bind to those, never to this.
 */
export class ManualTestCase {
  _id: string;
  team: Team | string;
  component: string;
  /** Folder this case is filed under, or null for the team root. */
  folder?: string | null;
  title: string;
  description: string;
  preconditions: string;
  status: ManualTestCaseStates;
  priority: ManualTestCasePriorities;
  tags: string[];
  steps: ManualStep[];
  customFields: { [key: string]: any };
  /** Current content version. Incremented only when content changes. */
  version: number;
  createdBy: any;
  updatedBy: any;
  createdAt: Date;
  updatedAt: Date;
  /** Present when read with expand=true: shared steps resolved into their steps. */
  expanded: boolean;
}
