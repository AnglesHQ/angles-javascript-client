import { AnglesReporterClass } from './lib/AnglesReporter'
import { Team, Environment , Action, Step, StepStates } from './lib/models/Types'
import { StoreScreenshot } from './lib/models/RequestTypes';

const reporter = AnglesReporterClass.getInstance();

const runTest = async () => {
  // const teams = await reporter.teams.getTeams();
  // teams.forEach((team:Team) => {
  //   console.log(`${team.name} - ${team._id}`);
  // });
  // const team = await reporter.teams.getTeam("605480fc2d8251000e6cb398");
  // console.log(`Team: ${team.name} - Id: ${team._id}`);
  // team.components.forEach((component) => {
  //     console.log(`Component: ${component.name}`);
  // })
  // const environments = await reporter.environments.getEnvironments();
  // environments.forEach((environment: Environment) => {
  //   console.log(`Environment: ${environment.name}`);
  // })

  try {
    // start build
    await reporter.startBuild("angles-javascript-client", "qa", "qa", "regression");

    // start test
    reporter.startTest("test1", "suite1");

    // add action
    reporter.addAction("My first action");

    // start reporting examples
    const screenshot = await reporter.storeScreenshot("/Users/sergio.barros/Desktop/image.png", "view_1");
    reporter.infoWithScreenshot("Took Screenshot", screenshot._id);
    reporter.pass("Assertion", "true", "true", "Just doing an assertion");

    // store the test
    await reporter.saveTest();

    // start test
    reporter.startTest("test2", "suite1");

    // add action
    reporter.addAction("My second action");

    // start reporting examples
    const screenshot2 = await reporter.storeScreenshot("/Users/sergio.barros/Desktop/image.png", "view_1");
    reporter.infoWithScreenshot("Took Screenshot", screenshot2._id);
    reporter.pass("Assertion", "true", "true", "Just doing an assertion");
    await reporter.saveTest();

  } catch(error) {
    console.log(error);
  }

}

runTest();
