import axios, { AxiosInstance} from "axios";
import { TeamRequests } from './requests/TeamRequests';
import { EnvironmentRequests } from './requests/EnvironmentRequests';
import { BuildRequests } from './requests/BuildRequests';
import { ExecutionRequests } from './requests/ExecutionRequests';
import { ScreenshotRequests } from './requests/ScreenshotRequests';

export class AnglesReporterClass {

    private static _instance:AnglesReporterClass = new AnglesReporterClass();
    protected axiosInstance: AxiosInstance;
    public teams:TeamRequests;
    public environments:EnvironmentRequests;
    public builds:BuildRequests;
    public executions:ExecutionRequests;
    public screenshots:ScreenshotRequests;

    constructor() {
      if (AnglesReporterClass._instance) {
        throw new Error('Error: Instantiation failed: Use AnglesReporterClass.getInstance() instead of new.');
      }
      AnglesReporterClass._instance = this;
      const apiConfig = {
        returnRejectedPromiseOnError: true,
        timeout: 10000,
        baseURL: "http://127.0.0.1:3000/rest/api/v1.0/",
        headers: {
          common: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      }
      this.axiosInstance = axios.create(apiConfig);
      this.teams = new TeamRequests(this.axiosInstance);
      this.environments = new EnvironmentRequests(this.axiosInstance);
      this.builds = new BuildRequests(this.axiosInstance);
      this.executions = new ExecutionRequests(this.axiosInstance);
      this.screenshots = new ScreenshotRequests(this.axiosInstance);
    }

    public static getInstance():AnglesReporterClass {
      return AnglesReporterClass._instance;
    }
}
