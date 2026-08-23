export class ManualChange {
  field: string;
  from: any;
  to: any;
}

/**
 * One audited mutation. Distinct from a version: a version is the content a tester saw,
 * while a history entry says who changed what and why - including a status change that
 * burns no version, and a case re-versioned by somebody else's shared step edit.
 */
export class ManualChangeHistoryEntry {
  _id: string;
  entityType: string;
  entityId: string;
  team: string;
  action: string;
  version: number;
  changes: ManualChange[];
  changedBy: any;
  changedAt: Date;
  comment: string;
  /** On a SHARED_STEP_UPDATE entry, the shared step whose edit caused this. */
  causedBy: any;
}
