/* tslint:disable:no-console */
import WDIOReporter from '@wdio/reporter'
import anglesReporter from '../../index';
import {Artifact} from '../../lib/models/Artifact';

export class AnglesWDIOReporter extends WDIOReporter {

  isEnabled: boolean;
  baseUrl: string;
  reportingUrl: string;
  buildName: string;
  team: string;
  environment: string;
  component: string;
  phase: string;
  artifacts: Artifact[];

  constructor(options: any) {
    super(options)
    this.isEnabled = options.enabled || true;
    this.baseUrl = options.baseUrl || 'http://127.0.0.1:3000/rest/api/v1.0/';
    this.reportingUrl = options.reportingUrl || 'http://127.0.0.1:3001';
    this.buildName = options.buildName || 'Test Automation Run';
    this.team = options.team || 'angles';
    this.environment = options.environment || 'qa';
    this.component = options.component || 'wdio-example';
    this.phase = options.phase || undefined;
    this.artifacts = options.artifacts || undefined;

    anglesReporter.setBaseUrl(this.baseUrl);
    anglesReporter.startBuild(
      this.buildName,
      this.team,
      this.environment,
      this.component,
      this.phase,
    ).then((build) => {
      process.env.ANGLES_ID = build._id;
      console.log(`Created build with id ${process.env.ANGLES_ID} in Angles`);
      if (this.artifacts) {
        const artifactArray: Artifact[] = [];
        this.artifacts.forEach((artifact) => {
          const { groupId, artifactId, version } = artifact;
          artifactArray.push(new Artifact(groupId, artifactId, version))
        })
        anglesReporter.addArtifacts(artifactArray).then((buildWithArtifacts) => {
          console.log(`Stored artifacts for build ${buildWithArtifacts._id}`);
        });
      }
    });
  }

  async onRunnerStart() {
    if (this.isEnabled) {
      anglesReporter.setBaseUrl(this.baseUrl);
      await anglesReporter.setCurrentBuild(process.env.ANGLES_ID);
    }
  }

  async onTestStart(test: { title: string; parent: string; }) {
    if (this.isEnabled && process.env.ANGLES_ID) {
      anglesReporter.startTest(test.title, test.parent);
    }
  }

  async onTestPass(test: { title: any; }) {
    if (this.isEnabled && process.env.ANGLES_ID) {
      anglesReporter.pass(`Test ${test.title} has passed`, 'Test Passed', 'Test Passed', '');
    }
  }

  async onTestFail(test: { title: any; }) {
    if (this.isEnabled && process.env.ANGLES_ID) {
      anglesReporter.fail(`Test ${test.title} has failed`, 'Test Passed', 'Test Failed', '');
    }
  }

  async onTestSkip(test: { title: any; }) {
    if (this.isEnabled && process.env.ANGLES_ID) {
      anglesReporter.info(`Test ${test.title} has skipped`);
    }
  }

  async onTestEnd() {
    if (this.isEnabled && process.env.ANGLES_ID) {
      await anglesReporter.saveTest();
    }
  }

  onRunnerEnd() {
    if (this.isEnabled && process.env.ANGLES_ID) {
      console.info(`Angles Dashboard Results: ${this.reportingUrl}/build/?buildId=${process.env.ANGLES_ID}`);
      process.env.ANGLES_ID = undefined;
    }
  }
}
