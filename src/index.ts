import { AnglesReporterClass } from './lib/AnglesReporter';
import { BuildRequests } from './lib/requests/BuildRequests';
import { TeamRequests } from './lib/requests/TeamRequests';
import { EnvironmentRequests } from './lib/requests/EnvironmentRequests';
import { ScreenshotRequests } from './lib/requests/ScreenshotRequests';
import { ExecutionRequests } from './lib/requests/ExecutionRequests';
import { BaselineRequests} from './lib/requests/BaselineRequests';
import { MetricRequests} from './lib/requests/MetricRequests';
import { AnglesRequests } from './lib/requests/AnglesRequests'
import { ManualTestCaseRequests } from './lib/requests/ManualTestCaseRequests';
import { ManualFolderRequests } from './lib/requests/ManualFolderRequests';
import { SharedStepRequests } from './lib/requests/SharedStepRequests';
import { CustomFieldRequests } from './lib/requests/CustomFieldRequests';
import { AttachmentRequests } from './lib/requests/AttachmentRequests';
import { ManualTestRunRequests } from './lib/requests/ManualTestRunRequests';

export {
  BuildRequests,
  TeamRequests,
  EnvironmentRequests,
  ScreenshotRequests,
  ExecutionRequests,
  BaselineRequests,
  MetricRequests,
  AnglesRequests,
  ManualTestCaseRequests,
  ManualFolderRequests,
  SharedStepRequests,
  CustomFieldRequests,
  AttachmentRequests,
  ManualTestRunRequests
};

export * from './lib/models/enum/ExecutionTypes';
export * from './lib/models/enum/ManualTestCaseStates';
export * from './lib/models/enum/ManualTestCasePriorities';
export * from './lib/models/enum/ManualRunStates';
export * from './lib/models/enum/ManualCaseResultStates';
export * from './lib/models/enum/ManualStepResultStates';
export * from './lib/models/enum/CustomFieldTypes';
export * from './lib/models/enum/CustomFieldScopes';
export * from './lib/models/manual/ManualStep';
export * from './lib/models/manual/ManualTestCase';
export * from './lib/models/manual/ManualTestCaseVersion';
export * from './lib/models/manual/ManualFolder';
export * from './lib/models/manual/SharedStep';
export * from './lib/models/manual/CustomFieldDefinition';
export * from './lib/models/manual/Attachment';
export * from './lib/models/manual/ManualTestRun';
export * from './lib/models/manual/ManualChangeHistoryEntry';
export * from './lib/models/requests/CreateManualTestCase';
export * from './lib/models/requests/CreateManualFolder';
export * from './lib/models/requests/MoveManualTestCases';
export * from './lib/models/requests/CreateSharedStep';
export * from './lib/models/requests/CreateCustomField';
export * from './lib/models/requests/CreateManualTestRun';
export * from './lib/models/requests/RecordManualResult';
export * from './lib/models/response/ManualResponses';
export default AnglesReporterClass.getInstance();
