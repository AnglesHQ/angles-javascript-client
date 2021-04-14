import { Step } from './Step';
import { ExecutionStates } from './enum/ExecutionStates';

export class Action {
  name: string;
  steps: Step[];
  status: ExecutionStates;
  start: Date;
  end: Date;
}
