
export enum ExecutionStates {
  SKIPPED = "SKIPPED",
  PASS = "PASS",
  ERROR = "ERROR",
  FAIL = "FAIL"
}

export enum StepStates {
  INFO = "INFO",
  DEBUG = "DEBUG",
  PASS = "PASS",
  ERROR = "ERROR",
  FAIL = "FAIL"
}

export class Team {
  _id: number;
  name: string;
  components: [{
    name: string;
    _id: string;
  }];
}

export class Environment {
  _id: number;
  name: string;
}

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

export class Artifact {
  groupId: string;
  artifactId: string;
  version: string;
}

export class Suite {
  name: string;
  result: Map<string, number>;
  status: ExecutionStates;
  start: Date;
  end: Date;
  executions: Execution[];
}

export class Step {
  name: string;
  expected: string;
  actual: string;
  info: string;
  status: StepStates;
  timestamp: Date;
  screenshot: string;
}

export class Action {
  name: string;
  steps: Step[];
  status: ExecutionStates;
  start: Date;
  end: Date;
}

export class Execution {
  _id: string;
  title: string;
  suite: string;
  feature: string;
  build: Build;
  start: Date;
  end: Date;
  actions: Action[];
  platforms: Platform[];
  tags: string[];
  meta: Map<string, string>;
  status: ExecutionStates;
}

export class Screenshot {
  _id: string;
  build: Build;
  thumbnail: string;
  timestamp: Date;
  path: string;
  view: string;
  height: number;
  width: number;
  platform: Platform;
  platformId: string;
  tags: string[];
}


export class Platform {
  _id: string;
  platformName: string;
  platformVersion: string;
  browserName: string;
  browserVersion: string;
  deviceName: string;
  userAgent: string;
  screenHeight: number;
  screenWidth: number;
  pixelRatio: number;
}
