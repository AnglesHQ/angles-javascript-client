import {AxiosResponse, AxiosInstance, AxiosError} from 'axios';
import { BaseRequests } from './BaseRequests';
import { Baseline } from '../models/Baseline';
import { Screenshot } from '../models/Screenshot';
import { IgnoreBox } from '../models/IgnoreBox';
import {DefaultResponse} from "../models/response/DefaultResponse";

export class BaselineRequests extends BaseRequests {
  private axios: AxiosInstance;

  public constructor(axiosInstance: AxiosInstance) {
    super();
    this.axios = axiosInstance;
  }

  public setBaseline(screenshot:Screenshot): Promise<Baseline> {
    const { view, _id: screenshotId } = screenshot;
    return this.axios.post<Baseline>(`baseline`, {
        view,
        screenshotId,
      })
      .then((response: AxiosResponse<Baseline>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

  public getBaselineForScreenshot(screenshot: Screenshot): Promise<Baseline[]> {
    const { view, height:screenHeight, width:screenWidth, platform: { platformName, deviceName, browserName}} = screenshot;
    let params:any = { view, platformName };
    if (deviceName) {
      params = { deviceName, ...params};
    } else {
      params = { browserName, screenHeight, screenWidth, ...params}
    }
    return this.axios.get<Baseline[]>(`baseline/`, {
        params
      })
      .then((response: AxiosResponse<Baseline[]>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      })
  }

  public getBaselines(): Promise<Baseline[]> {
    return this.axios.get<Baseline[]>(`baseline`)
      .then((response: AxiosResponse<Baseline[]>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      })
  }

  public getBaseline(baselineId: string): Promise<Baseline> {
    return this.axios.get<Baseline>(`baseline/${baselineId}`)
      .then((response: AxiosResponse<Baseline>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error)
      });
  }

  public deleteBaseline(baselineId: string): Promise<DefaultResponse> {
    return this.axios.delete<DefaultResponse>(`baseline/${baselineId}`)
      .then((response: AxiosResponse<DefaultResponse>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

  /**
   *
   * @param {string} baselineId the id of the baseline you want to update.
   * @param {string} [screenshotId] the new screenshot you want to set as the baseline.
   * @param {IgnoreBox[]} [ignoreBoxes] the ignoreboxes you want to set for the baseline.
   */
  public updateBaseline(baselineId: string, screenshotId: string, ignoreBoxes: IgnoreBox[]): Promise<Baseline> {
    let updateBaselineRequest:any = {};
    if (screenshotId) {
      updateBaselineRequest = { screenshotId, ...updateBaselineRequest };
    }
    if (ignoreBoxes) {
      updateBaselineRequest = { ignoreBoxes, ...updateBaselineRequest };
    }
    return this.axios.put<Baseline>(`baseline/${baselineId}`, updateBaselineRequest)
      .then((response: AxiosResponse<Baseline>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }
}
