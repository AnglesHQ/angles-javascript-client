import { ExecutionStates } from './enum/ExecutionStates';
import { Environment } from './Environment';
import { Team } from './Team';
import { Artifact } from './Artifact';
import { Suite } from './Suite';

export class Build {
  _id: string;
  name: string;
  result: Map<string, number>;
  status: ExecutionStates;
  start: Date;
  end: Date;
  artifacts: Artifact;
  keep: boolean;
  environment: Environment;
  team: Team;
  component: string;
  suites: Suite[];
}
