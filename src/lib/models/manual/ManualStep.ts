/**
 * A single step of a manual test case.
 *
 * On a test case head, a step with `sharedStep` set is a placeholder: its own action and
 * expected are ignored, and the shared step's steps are expanded in its place. A frozen
 * version never carries `sharedStep` - it stores the expanded steps, each carrying
 * `sharedStepRef`/`sharedStepVersion` for attribution only. That is what stops a later
 * edit to a shared step rewriting what a historical execution shows.
 */
export class ManualStep {
  _id: string;
  order: number;
  action: string;
  expected: string;
  data: string;
  attachments: string[];
  /** Set on a head placeholder. Absent on an expanded or frozen step. */
  sharedStep: string;
  /** Set on an expanded step: which shared step it came from. */
  sharedStepRef: string;
  /** Which revision of that shared step it was expanded from. */
  sharedStepVersion: number;
  /** True when the referenced shared step no longer exists. */
  unresolvedSharedStep: boolean;
}
