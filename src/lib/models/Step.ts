import { StepStates } from './enum/StepStates';

export class Step {
  name: string;
  expected: string;
  actual: string;
  info: string;
  status: StepStates;
  timestamp: Date;
  screenshot: string;
}
