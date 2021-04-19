import { AxiosResponse, AxiosInstance } from 'axios';
import { BaseRequests } from './BaseRequests';
import { Baseline } from '../models/Baseline';
import { Screenshot } from '../models/Screenshot';
import { IgnoreBox } from '../models/IgnoreBox';

export class BaselineRequests extends BaseRequests {
  private axios: AxiosInstance;

  public constructor(axiosInstance: AxiosInstance) {
    super();
    this.axios = axiosInstance;
  }

  public async setBaseline(screenshot:Screenshot): Promise<Baseline> {
    const { view, _id: screenshotId } = screenshot;
    const response: AxiosResponse<Baseline> = await this.axios.post<Baseline>(`baseline`, {
      view,
      screenshotId,
    });
    return this.success(response);
  }

  public async getBaselineForScreenshot(screenshot: Screenshot): Promise<Baseline[]> {
    const { view, height:screenHeight, width:screenWidth, platform: { platformName, deviceName, browserName}} = screenshot;
    let params:any = { view, platformName };
    if (deviceName) {
      params = { deviceName, ...params};
    } else {
      params = { browserName, screenHeight, screenWidth, ...params}
    }
    const response: AxiosResponse<Baseline[]> = await this.axios.get<Baseline[]>(`baseline/`, {
      params
    });
    return this.success(response);
  }

  public async getBaselines(): Promise<Baseline[]> {
    const response: AxiosResponse<Baseline[]> = await this.axios.get<Baseline[]>(`baseline`);
    return this.success(response);
  }

  public async getBaseline(baselineId: string): Promise<Baseline> {
    const response: AxiosResponse<Baseline> = await this.axios.get<Baseline>(`baseline/${baselineId}`);
    return this.success(response);
  }

  // TODO: Delete baseline.

  /**
   *
   * @param {string} baselineId the id of the baseline you want to update.
   * @param {string} [screenshotId] the new screenshot you want to set as the baseline.
   * @param {IgnoreBox[]} [ignoreBoxes] the ignoreboxes you want to set for the baseline.
   */
  public async updateBaseline(baselineId: string, screenshotId: string, ignoreBoxes: IgnoreBox[]): Promise<Baseline> {
    let updateBaselineRequest:any = {};
    if (screenshotId) {
      updateBaselineRequest = { screenshotId, ...updateBaselineRequest };
    }
    if (ignoreBoxes) {
      updateBaselineRequest = { ignoreBoxes, ...updateBaselineRequest };
    }
    const response: AxiosResponse<Baseline> = await this.axios.put<Baseline>(`baseline/${baselineId}`, updateBaselineRequest);
    return this.success(response);
  }
}
