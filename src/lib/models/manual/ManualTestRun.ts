import { Platform } from '../Platform';
import { ManualRunStates } from '../enum/ManualRunStates';
import { ManualCaseResultStates } from '../enum/ManualCaseResultStates';
import { ManualStepResultStates } from '../enum/ManualStepResultStates';
import { ManualTestCaseVersion } from './ManualTestCaseVersion';

export class ManualStepResult {
  /** The _id of the step in the frozen version, so a later reorder cannot misbind it. */
  stepId: string;
  status: ManualStepResultStates;
  actual: string;
  notes: string;
  attachments: string[];
  timestamp: Date;
}

export class ManualRunTestCase {
  testCase: string;
  /** The frozen version being executed. Bound when added, never moved implicitly. */
  testCaseVersion: string;
  versionNumber: number;
  snapshotTitle: string;
  status: ManualCaseResultStates;
  stepResults: ManualStepResult[];
  execution: string;
  executedBy: any;
  notes: string;
  start: Date;
  end: Date;
  /** Populated when the run is read with expand=true. */
  version: ManualTestCaseVersion;
}

/**
 * A planned or in-flight session of manual testing. Results are written as ordinary
 * executions against a Build tagged `manual`, so they appear on the existing dashboards.
 */
export class ManualTestRun {
  _id: string;
  name: string;
  description: string;
  team: any;
  component: string;
  environment: any;
  phase: any;
  /** The manual-tagged build this run's executions are written into. */
  build: string;
  status: ManualRunStates;
  assignedTo: any;
  platforms: Platform[];
  testCases: ManualRunTestCase[];
  start: Date;
  end: Date;
  createdBy: any;
  createdAt: Date;
  updatedAt: Date;
  expanded: boolean;
}
