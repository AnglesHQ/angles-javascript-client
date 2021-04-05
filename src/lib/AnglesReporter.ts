import axios, { AxiosInstance} from "axios";
import { TeamRequests } from './TeamRequests';

export class AnglesReporterClass {

    private static _instance:AnglesReporterClass = new AnglesReporterClass();
    protected axiosInstance: AxiosInstance;
    public teams:TeamRequests;

    constructor() {
      if (AnglesReporterClass._instance) {
        throw new Error('Error: Instantiation failed: Use AnglesReporterClass.getInstance() instead of new.');
      }
      AnglesReporterClass._instance = this;
      let apiConfig = {
        returnRejectedPromiseOnError: true,
        withCredentials: true,
        timeout: 30000,
        baseURL: "http://127.0.0.1:3000/rest/api/v1.0/",
        headers: {
          common: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      }
      this.axiosInstance = axios.create(apiConfig);
      this.teams = new TeamRequests(this.axiosInstance);
    }

    public static getInstance():AnglesReporterClass {
      return AnglesReporterClass._instance;
    }
}
