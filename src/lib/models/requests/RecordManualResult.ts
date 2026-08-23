import { ManualCaseResultStates } from '../enum/ManualCaseResultStates';
import { ManualStepResultStates } from '../enum/ManualStepResultStates';

export class RecordManualStepResult {
  stepId?: string;
  status?: ManualStepResultStates;
  actual?: string;
  notes?: string;
  attachments?: string[];
  timestamp?: Date;
}

export class RecordManualResult {
  status: ManualCaseResultStates;
  notes?: string;
  stepResults?: RecordManualStepResult[];
}
