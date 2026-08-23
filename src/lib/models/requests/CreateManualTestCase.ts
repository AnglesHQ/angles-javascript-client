import { ManualTestCaseStates } from '../enum/ManualTestCaseStates';
import { ManualTestCasePriorities } from '../enum/ManualTestCasePriorities';

export class CreateManualStep {
  order?: number;
  action: string;
  expected?: string;
  data?: string;
  attachments?: string[];
  /** Include a re-usable shared step in place of this step's own content. */
  sharedStep?: string;
}

export class CreateManualTestCase {
  team: string;
  /** File the case into a folder on create. Null or absent files it at the root. */
  folder?: string | null;
  title: string;
  component?: string;
  description?: string;
  preconditions?: string;
  status?: ManualTestCaseStates;
  priority?: ManualTestCasePriorities;
  tags?: string[];
  steps?: CreateManualStep[];
  customFields?: { [key: string]: any };
  /** Optional reason, recorded on the change history entry. */
  comment?: string;
}
