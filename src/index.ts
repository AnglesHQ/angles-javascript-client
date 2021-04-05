import { AnglesReporterClass } from './lib/AnglesReporter'
import { Team } from './lib/types'
// comment
let reporter = AnglesReporterClass.getInstance();

let runTest = async () => {
  const teams = await reporter.teams.getTeams();
  teams.forEach((team:Team) => {
    console.log(`${team.name} - ${team._id}`);
  });
  const team = await reporter.teams.getTeam("604e313b00329e000daf3952");
  console.log(`${team.name} - ${team._id}`);
}

runTest();
