import { StepStates } from './enum/StepStates';

export class Step {
  name: string;
  expected: string;
  actual: string;
  info: string;
  status: StepStates;
  timestamp: Date;
  screenshot: string;
  /**
   * Images attached while recording a manual step result, or the ids of files an automated
   * test attached to this step (see AnglesReporter.attachFileToLastStep).
   */
  attachments: string[];
}
