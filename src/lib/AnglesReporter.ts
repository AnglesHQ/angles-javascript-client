import axios, {AxiosError, AxiosInstance} from 'axios';
import { TeamRequests } from './requests/TeamRequests';
import { EnvironmentRequests } from './requests/EnvironmentRequests';
import { BuildRequests } from './requests/BuildRequests';
import { ExecutionRequests } from './requests/ExecutionRequests';
import { ScreenshotRequests } from './requests/ScreenshotRequests';
import { Build } from './models/Build';
import { CreateExecution } from './models/requests/CreateExecution';
import { Action } from './models/Action';
import { CreateBuild } from './models/requests/CreateBuild';
import { Artifact } from './models/Artifact';
import { Screenshot } from './models/Screenshot';
import { StoreScreenshot } from './models/requests/StoreScreenshot';
import { StepStates } from './models/enum/StepStates';
import { Step } from './models/Step';
import { ScreenshotPlatform } from './models/requests/ScreenshotPlatform';
import { Execution } from './models/Execution';
import { ImageCompareResponse } from './models/response/ImageCompareResponse';
import {Platform} from "./models/Platform";

export class AnglesReporterClass {
  private static _instance: AnglesReporterClass = new AnglesReporterClass();
  protected axiosInstance: AxiosInstance;
  public teams: TeamRequests;
  public environments: EnvironmentRequests;
  public builds: BuildRequests;
  public executions: ExecutionRequests;
  public screenshots: ScreenshotRequests;

  private currentBuild: Build;
  private currentExecution: CreateExecution;
  private currentAction: Action;
  private apiConfig = {
    returnRejectedPromiseOnError: true,
    timeout: 10000,
    baseURL: 'http://127.0.0.1:3000/rest/api/v1.0/',
    headers: {
      common: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  };

  constructor() {
    if (AnglesReporterClass._instance) {
      throw new Error('Error: Instantiation failed: Use AnglesReporterClass.getInstance() instead of new.');
    }
    AnglesReporterClass._instance = this;
    this.instantiateAxios();
  }

  public setBaseUrl(baseUrl: string) {
    this.apiConfig.baseURL = baseUrl;
    this.instantiateAxios();
  }

  /**
   * If the current build at a seperate point, then you can set it again by calling this function.
   * @param buildId
   */
  public setCurrentBuild(buildId:string) {
      if (!this.currentBuild) {
        this.currentBuild = new Build();
      }
      this.currentBuild._id = buildId;
  }

  private instantiateAxios():void {
    this.axiosInstance = axios.create(this.apiConfig);
    this.teams = new TeamRequests(this.axiosInstance);
    this.environments = new EnvironmentRequests(this.axiosInstance);
    this.builds = new BuildRequests(this.axiosInstance);
    this.executions = new ExecutionRequests(this.axiosInstance);
    this.screenshots = new ScreenshotRequests(this.axiosInstance);
  }

  public static getInstance(): AnglesReporterClass {
    return AnglesReporterClass._instance;
  }

  /**
   * Returns the single instance of the angles reporter.
   *
   * @param {string} [baseUrl] - Set a new base url whilst grabbing the latest instance. e.g. http://127.0.0.1:3000/rest/api/v1.0/
   */
  public static getInstanceWithBaseUrl(baseUrl:string): AnglesReporterClass {
    if (baseUrl !== undefined) {
      AnglesReporterClass._instance.setBaseUrl(baseUrl);
    }
    return AnglesReporterClass._instance;
  }

  public async startBuild(name: string, team: string, environment: string, component: string, phase: string): Promise<Build> {
    const createBuildRequest = new CreateBuild();
    createBuildRequest.name = name;
    createBuildRequest.team = team;
    createBuildRequest.environment = environment;
    createBuildRequest.component = component;
    if (phase)
      createBuildRequest.phase = phase;
    createBuildRequest.start = new Date();
    return new Promise((resolve, reject) => {
      this.builds.createBuild(createBuildRequest)
        .then((createdBuild) => {
          this.currentBuild = createdBuild;
          resolve(createdBuild);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }

  public addArtifacts(artifacts: Artifact[]): Promise<Build> {
    return this.builds.addArtifacts(this.currentBuild._id, artifacts);
  }

  public startTest(title: string, suite: string): void {
    this.currentExecution = new CreateExecution();
    this.currentExecution.title = title;
    this.currentExecution.suite = suite;
    this.currentExecution.build = this.currentBuild._id;
    this.currentExecution.actions = [];
    this.currentExecution.platforms = [];
    this.currentAction = undefined;
  }

  public updateTestName(title: string, suite: string): void {
    if (this.currentExecution) {
      this.currentExecution.title = title;
      if (suite)
        this.currentExecution.suite = suite;
    }
  }

  public storePlatformDetails(platform: Platform): void {
    if (this.currentExecution) {
      this.currentExecution.platforms.push(platform);
    }
  }

  public saveTest(): Promise<Execution> {
    return this.executions.saveExecution(this.currentExecution);
  }

  public saveScreenshot(filePath: string, view: string, tags: string[]): Promise<Screenshot> {
    return this.saveScreenshotWithPlatform(filePath, view,  tags,undefined);
  }

  public saveScreenshotWithPlatform(
    filePath: string,
    view: string,
    tags: string[],
    platform: ScreenshotPlatform,
  ): Promise<Screenshot> {
    const path = require('path');
    const storeScreenshot = new StoreScreenshot();
    storeScreenshot.buildId = this.currentBuild._id;
    storeScreenshot.filePath =  path.resolve(filePath);
    storeScreenshot.view = view;
    storeScreenshot.timestamp = new Date();
    storeScreenshot.tags = tags;
    storeScreenshot.platform = platform;
    return this.screenshots.saveScreenshot(storeScreenshot);
  }

  public compareScreenshotAgainstBaseline(screenshotId: string) : Promise<ImageCompareResponse> {
    return this.screenshots.getBaselineCompare(screenshotId);
  }

  public addAction(name: string) {
    this.currentAction = new Action();
    this.currentAction.name = name;
    this.currentAction.start = new Date();
    this.currentAction.steps = [];
    if (this.currentExecution === undefined) {
      this.startTest("Set-up", "Set-up");
    }
    this.currentExecution.actions.push(this.currentAction);
  }

  public info(info: string) {
    this.addStep('INFO', undefined, undefined, info, StepStates.INFO, undefined);
  }

  public debug(info: string) {
    this.addStep('DEBUG', undefined, undefined, info, StepStates.DEBUG, undefined);
  }

  public infoWithScreenshot(info: string, screenshotId: string) {
    this.addStep('INFO', undefined, undefined, info, StepStates.INFO, screenshotId);
  }

  public error(error: string) {
    this.addStep('ERROR', undefined, undefined, error, StepStates.ERROR, undefined);
  }

  public errorWithScreenshot(error: string, screenshotId: string) {
    this.addStep('ERROR', undefined, undefined, error, StepStates.ERROR, screenshotId);
  }

  public pass(name: string, expected: string, actual: string, info: string): void {
    this.addStep(name, expected, actual, info, StepStates.PASS, undefined);
  }

  public passWithScreenshot(name: string, expected: string, actual: string, info: string, screenshot: string): void {
    this.addStep(name, expected, actual, info, StepStates.PASS, screenshot);
  }

  public fail(name: string, expected: string, actual: string, info: string) {
    this.addStep(name, expected, actual, info, StepStates.FAIL, undefined);
  }

  public failWithScreenshot(name: string, expected: string, actual: string, info: string, screenshotId: string) {
    this.addStep(name, expected, actual, info, StepStates.FAIL, screenshotId);
  }

  public addStep(
    name: string,
    expected: string,
    actual: string,
    info: string,
    status: StepStates,
    screenshot: string,
  ): void {
    if (this.currentAction === undefined) {
      this.addAction('test-details');
    }
    const step = new Step();
    step.name = name;
    step.actual = actual;
    step.expected = expected;
    step.info = info;
    step.status = status;
    step.timestamp = new Date();
    step.screenshot = screenshot;
    this.currentAction.steps.push(step);
  }
}
