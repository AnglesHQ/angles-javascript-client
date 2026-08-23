import { Platform } from '../Platform';

export class CreateManualTestRun {
  name: string;
  team: string;
  /** Environment name, not id - matching POST /build. */
  environment: string;
  description?: string;
  component?: string;
  /** Phase name, not id. */
  phase?: string;
  assignedTo?: string;
  platforms?: Platform[];
  /** Each is bound to its current frozen version. A DEPRECATED case is rejected. */
  testCaseIds?: string[];
}
