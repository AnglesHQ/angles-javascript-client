import { AnglesReporterClass } from './lib/AnglesReporter'
import { Team, Environment } from './lib/types'
// comment
const reporter = AnglesReporterClass.getInstance();

const runTest = async () => {
  const teams = await reporter.teams.getTeams();
  teams.forEach((team:Team) => {
    console.log(`${team.name} - ${team._id}`);
  });
  const team = await reporter.teams.getTeam("604e313b00329e000daf3952");
  console.log(`Team: ${team.name} - Id: ${team._id}`);
  team.components.forEach((component) => {
      console.log(`Component: ${component.name}`);
  })
  const environments = await reporter.environments.getEnvironments();
  environments.forEach((environment: Environment) => {
    console.log(`Environment: ${environment.name}`);
  })
}

runTest();
