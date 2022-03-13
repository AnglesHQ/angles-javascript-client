import { AxiosInstance } from 'axios';
import { BaseRequests } from './BaseRequests';
import { Baseline } from '../models/Baseline';
import { Screenshot } from '../models/Screenshot';
import { IgnoreBox } from '../models/IgnoreBox';
import {DefaultResponse} from "../models/response/DefaultResponse";

export class BaselineRequests extends BaseRequests {

  public constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance);
  }

  public setBaseline(screenshot:Screenshot): Promise<Baseline> {
    const { view, _id: screenshotId } = screenshot;
    return this.post<Baseline>(`baseline`, {
      view,
      screenshotId,
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
    return this.get<Baseline[]>(`baseline/`, {
      params
    });
  }

  public getBaselines(): Promise<Baseline[]> {
    return this.get<Baseline[]>(`baseline`);
  }

  public getBaseline(baselineId: string): Promise<Baseline> {
    return this.get<Baseline>(`baseline/${baselineId}`);
  }

  public deleteBaseline(baselineId: string): Promise<DefaultResponse> {
    return this.delete<DefaultResponse>(`baseline/${baselineId}`);
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
    return this.put<Baseline>(`baseline/${baselineId}`, updateBaselineRequest);
  }
}
