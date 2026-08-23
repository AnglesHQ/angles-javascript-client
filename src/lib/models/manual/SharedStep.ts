import { ManualStep } from './ManualStep';

/** A re-usable sequence of steps that many manual test cases can include. */
export class SharedStep {
  _id: string;
  team: string;
  name: string;
  description: string;
  steps: ManualStep[];
  /** Incremented only when the steps change. */
  version: number;
  createdBy: any;
  updatedBy: any;
  createdAt: Date;
  updatedAt: Date;
}
