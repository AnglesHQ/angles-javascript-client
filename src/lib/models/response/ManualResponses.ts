import { ManualTestCase } from '../manual/ManualTestCase';
import { ManualTestCaseVersion } from '../manual/ManualTestCaseVersion';
import { SharedStep } from '../manual/SharedStep';
import { CustomFieldDefinition } from '../manual/CustomFieldDefinition';
import { Attachment } from '../manual/Attachment';
import { ManualTestRun } from '../manual/ManualTestRun';
import { ManualChangeHistoryEntry } from '../manual/ManualChangeHistoryEntry';

export class ManualTestCasesResponse {
  testCases: ManualTestCase[];
  metrics: { totalTestCases: number };
}

export class ManualTestCaseVersionSummary {
  _id: string;
  version: number;
  title: string;
  createdBy: any;
  createdAt: Date;
}

export class ManualTestCaseVersionsResponse {
  versions: ManualTestCaseVersionSummary[];
}

export class SharedStepsResponse {
  sharedSteps: SharedStep[];
  metrics: { totalSharedSteps: number };
}

export class SharedStepUsageResponse {
  testCases: { _id: string, title: string, status: string, version: number }[];
  metrics: { totalTestCases: number };
}

/** A shared step update reports what it did to the cases that include it. */
export class SharedStepUpdateResponse extends SharedStep {
  cascade: {
    testCasesVersioned: number,
    failures: { testCase: string, error: string }[],
  };
}

export class CustomFieldsResponse {
  customFields: CustomFieldDefinition[];
}

/** Delete either removes the field or, if it is in use, archives it. */
export class CustomFieldDeleteResponse {
  message: string;
  archived: boolean;
  customField: CustomFieldDefinition;
}

export class AttachmentsResponse {
  attachments: Attachment[];
}

export class ManualTestRunsResponse {
  testRuns: ManualTestRun[];
  metrics: { totalTestRuns: number };
}

export class ManualChangeHistoryResponse {
  history: ManualChangeHistoryEntry[];
  metrics: { totalEntries: number };
}

export { ManualTestCaseVersion };
