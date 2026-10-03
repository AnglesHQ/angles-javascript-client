import { Build } from './Build';
import { Platform } from './Platform';
import { ExecutionStates } from './enum/ExecutionStates';
import { Action } from './Action';
import { ExecutionTypes } from './enum/ExecutionTypes';

export class Execution {
  _id: string;
  title: string;
  suite: string;
  feature: string;
  build: Build;
  start: Date;
  end: Date;
  actions: Action[];
  platforms: Platform[];
  tags: string[];
  meta: Map<string, string>;
  /** Ids of the files attached to the whole test. Step-level ones are on the steps. */
  attachments: string[];
  status: ExecutionStates;
  executionType: ExecutionTypes;
  /** Set on a manual execution: the test case it came from. */
  manualTestCase: string;
  /**
   * The frozen version this execution was run against. Present on the execution as well
   * as on the run entry, so a dashboard or history view can render the content it was
   * executed against without loading the run.
   */
  manualTestCaseVersion: string;
  versionNumber: number;
  executedBy: any;
}
