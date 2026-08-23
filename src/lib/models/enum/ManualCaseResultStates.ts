/**
 * Per-case result states within a manual run. Richer than ExecutionStates: BLOCKED and
 * IN_PROGRESS exist only here. BLOCKED is written to the underlying TestExecution as
 * SKIPPED, because a blocked test was never executed - recording it as an error would
 * inflate the failure count on every dashboard.
 */
export enum ManualCaseResultStates {
  NOT_RUN = 'NOT_RUN',
  IN_PROGRESS = 'IN_PROGRESS',
  PASS = 'PASS',
  FAIL = 'FAIL',
  ERROR = 'ERROR',
  SKIPPED = 'SKIPPED',
  BLOCKED = 'BLOCKED',
}
