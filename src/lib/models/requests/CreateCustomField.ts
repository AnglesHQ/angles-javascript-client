import { CustomFieldTypes } from '../enum/CustomFieldTypes';
import { CustomFieldScopes } from '../enum/CustomFieldScopes';

export class CreateCustomField {
  team: string;
  key: string;
  label: string;
  type: CustomFieldTypes;
  options?: string[];
  required?: boolean;
  defaultValue?: any;
  order?: number;
  appliesTo?: CustomFieldScopes;
  archived?: boolean;
}
