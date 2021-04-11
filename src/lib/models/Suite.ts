import { ExecutionStates } from './enum/ExecutionStates';
import { Execution } from './Execution';

export class Suite {
  name: string;
  result: Map<string, number>;
  status: ExecutionStates;
  start: Date;
  end: Date;
  executions: Execution[];
}
