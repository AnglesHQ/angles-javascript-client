/**
 * Who started a build, taken from the authenticated caller when the build was created.
 */
export class TriggeredBy {
  /** Id of the user. */
  user?: string;
  /** Username at the time; kept even if the account is later deleted. */
  username?: string;
  /** Name of the API token used, when the build was reported with an API key. Never the token itself. */
  tokenName?: string;
}
