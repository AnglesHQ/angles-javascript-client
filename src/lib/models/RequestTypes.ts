import { Action, Build, Platform, ExecutionStates } from './Types';

export class CreateBuild {
  environment: string;
  team: string;
  component: string;
  name: string;

  constructor(name: string, environment: string, team: string, component: string) {
    this.environment = environment;
    this.team = team;
    this.component = component;
    this.name = name;
  }
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

export class StoreScreenshot {
  buildId: string;
  view: string;
  timestamp: Date;
  filePath: string;
}

export class ScreenshotPlatform {
  platformName: string;
  platformVersion: string;
  browserName: string;
  browserVersion: string;
  deviceName: string;
}
