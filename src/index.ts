import { AnglesReporterClass } from './lib/AnglesReporter';
// import { Artifact } from '../dist/lib/types';
// import { ScreenshotPlatform } from './lib/models/requests/ScreenshotPlatform';

// const reporter = AnglesReporterClass.getInstance();

// const runTest = async () => {
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

  // try {
  //   // start build
  //   await reporter.startBuild('angles-javascript-client', 'qa', 'qa', 'regression');
  //
  //   // add artifacts
  //   const artifact = new Artifact();
  //   artifact.artifactId = 'angles-ui';
  //   artifact.groupId = 'anglesHQ';
  //   artifact.version = '1.0.0';
  //   const artifactArray: Artifact[] = [];
  //   artifactArray.push(artifact);
  //   await reporter.addArtifacts(artifactArray);
  //
  //   // start test
  //   reporter.startTest('test1', 'suite1');
  //
  //   // add action
  //   reporter.addAction('My first action');
  //
  //   // start reporting examples
  //   const platform = new ScreenshotPlatform();
  //   platform.platformName = 'Android';
  //   platform.browserName = 'Chrome';
  //   const screenshot = await reporter.saveScreenshotWithPlatform(
  //     '/Users/sergio.barros/Desktop/image.png',
  //     'view_1',
  //     platform,
  //   );
  //   reporter.infoWithScreenshot('Took Screenshot', screenshot._id);
  //   reporter.pass('Assertion', 'true', 'true', 'Just doing an assertion');
  //
  //   // store the test
  //   await reporter.saveTest();
  // } catch (error) {
  //   // tslint:disable-next-line:no-console
  //   console.log(error);
  // }
// };

// runTest();

export {
  AnglesReporterClass
}
