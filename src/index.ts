import { AnglesReporterClass } from './lib/AnglesReporter'
import { Team, Environment , Action, Step, StepStates } from './lib/models/Types'
import { CreateBuild, CreateExecution, CreateScreenshot } from './lib/models/RequestTypes';
// comment
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

  const createBuildRequest = new CreateBuild();
  createBuildRequest.name = "angles-javascript-client";
  createBuildRequest.environment = "qa";
  createBuildRequest.team = "qa";
  createBuildRequest.component = "regression";
  const createdBuild = await reporter.builds.createBuild(createBuildRequest);

  const build = await reporter.builds.getBuild(createdBuild._id);
  console.log(JSON.stringify(build._id));

  const screenshotRequest = new CreateScreenshot();
  screenshotRequest.timestamp = new Date();
  screenshotRequest.view = "test-view";
  screenshotRequest.buildId = build._id;
  screenshotRequest.filePath = "/Users/sergio.barros/Desktop/image.png";
  let screenshot;
  try {
    screenshot = await reporter.screenshots.saveScreenshot(screenshotRequest)
    console.log(screenshot._id);
  } catch (error) {
    console.log(error);
  }
  
  const createExecutionRequest = new CreateExecution();
  createExecutionRequest.title = "test1";
  createExecutionRequest.suite = "suite1";
  createExecutionRequest.build = build._id;
  createExecutionRequest.actions = [];

  // create action
  const action = new Action();
  action.name = "My action";
  action.start = new Date();

  const step = new Step();
  step.name = "Step Name";
  step.actual = "true";
  step.expected = "true";
  step.info = "My info";
  step.status = StepStates.PASS;
  step.timestamp = new Date();
  step.screenshot = screenshot._id;

  action.steps = [];
  action.steps.push(step);

  createExecutionRequest.actions.push(action);

  try {
    console.log('REQUEST: ' + JSON.stringify(createExecutionRequest));
    const execution = await reporter.executions.saveExecution(createExecutionRequest);
    console.log(`Execution: ${JSON.stringify(execution)}`);
  } catch (error) {
    console.log(JSON.stringify(error));
  }

}

runTest();
