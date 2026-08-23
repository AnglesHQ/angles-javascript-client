export class CreateManualFolder {
  team: string;
  name: string;
  description?: string;
  /** Omit or pass null to create a folder at the team root. */
  parent?: string | null;
}
