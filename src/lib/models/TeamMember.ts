export class TeamMember {
  _id: string;
  username: string;
  role: 'admin' | 'team_lead' | 'user';
  /** 'local', or the id of the SSO provider that authenticates the user. */
  authProvider: string;
}
