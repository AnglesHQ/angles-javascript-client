import { CustomFieldTypes } from '../enum/CustomFieldTypes';
import { CustomFieldScopes } from '../enum/CustomFieldScopes';

export class CustomFieldDefinition {
  _id: string;
  team: string;
  /** Stable storage key. Cannot be changed once created - create a new field instead. */
  key: string;
  /** Display name. Safe to change; frozen versions keep the label in force at the time. */
  label: string;
  type: CustomFieldTypes;
  options: string[];
  /** Enforced only when a case is saved with a status other than DRAFT. */
  required: boolean;
  defaultValue: any;
  order: number;
  appliesTo: CustomFieldScopes;
  /** Archived fields are hidden from authoring but still render existing values. */
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}
