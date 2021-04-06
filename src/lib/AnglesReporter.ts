import axios, { AxiosInstance} from "axios";
import { TeamRequests } from './TeamRequests';
import { EnvironmentRequests } from './EnvironmentRequests';
export class AnglesReporterClass {

    private static _instance:AnglesReporterClass = new AnglesReporterClass();
    protected axiosInstance: AxiosInstance;
    public teams:TeamRequests;
    public environments:EnvironmentRequests;

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
    }

    public static getInstance():AnglesReporterClass {
      return AnglesReporterClass._instance;
    }
}
