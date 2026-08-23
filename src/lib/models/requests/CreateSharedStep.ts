import { CreateManualStep } from './CreateManualTestCase';

export class CreateSharedStep {
  team: string;
  name: string;
  description?: string;
  /** Always literal - a shared step cannot include another shared step. */
  steps: CreateManualStep[];
  comment?: string;
}
