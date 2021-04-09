import { Action, Build, Platform, ExecutionStates } from './Types';

export class CreateBuild {
  environment: string;
  team: string;
  component: string;
  name: string;
}

export class CreateExecution {
  title: string;
  suite: string;
  feature: string;
  build: string;
  actions: Action[];
  platforms: Platform[];
  tags: string[];
  meta: Map<string, string>;
}

export class CreateScreenshot {
  buildId: string;
  view: string;
  timestamp: Date;
  filePath: string;
}
