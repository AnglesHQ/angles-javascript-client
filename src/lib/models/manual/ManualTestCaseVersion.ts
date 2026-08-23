import { ManualStep } from './ManualStep';
import { ManualTestCasePriorities } from '../enum/ManualTestCasePriorities';

/** A frozen custom field definition, as it stood when a version was written. */
export class CustomFieldDefinitionSnapshot {
  key: string;
  label: string;
  type: string;
  options: string[];
}

/**
 * An immutable copy of one version of a manual test case. Never updated or deleted, which
 * is what lets an execution bound to it always render the content it was run against.
 */
export class ManualTestCaseVersion {
  _id: string;
  testCase: string;
  version: number;
  team: string;
  title: string;
  description: string;
  preconditions: string;
  priority: ManualTestCasePriorities;
  tags: string[];
  /** Shared steps already expanded - a version never holds a reference. */
  steps: ManualStep[];
  customFields: { [key: string]: any };
  fieldDefinitions: CustomFieldDefinitionSnapshot[];
  createdBy: any;
  createdAt: Date;
  /** Present only for a case predating version tracking; not guaranteed immutable. */
  unversioned: boolean;
}
