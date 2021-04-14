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
