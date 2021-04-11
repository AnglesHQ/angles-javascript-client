import { AxiosResponse, AxiosInstance } from 'axios';
import FormData from 'form-data';
import { BaseRequests } from './BaseRequests';
import { Screenshot } from '../models/Screenshot';
import { StoreScreenshot } from '../models/requests/StoreScreenshot';
import { ScreenshotPlatform } from '../models/requests/ScreenshotPlatform';

export class ScreenshotRequests extends BaseRequests {
  private axios: AxiosInstance;
  private path = require('path');
  private fs = require('fs');

  public constructor(axiosInstance: AxiosInstance) {
    super();
    this.axios = axiosInstance;
  }

  public async getScreenshot(screenshotId: string): Promise<Screenshot> {
    const response: AxiosResponse<Screenshot> = await this.axios.get<Screenshot>(`screenshot/${screenshotId}`);
    return this.success(response);
  }

  public async saveScreenshot(storeScreenshot: StoreScreenshot): Promise<Screenshot> {
    return await this.saveScreenshotWithPlatform(storeScreenshot, undefined);
  }

  public async saveScreenshotWithPlatform(
    storeScreenshot: StoreScreenshot,
    platform: ScreenshotPlatform,
  ): Promise<Screenshot> {
    const formData = new FormData();
    const fullPath = this.path.resolve(storeScreenshot.filePath);
    const fileStream = this.fs.createReadStream(fullPath);
    formData.append('screenshot', fileStream);
    if (platform !== undefined) {
      Object.entries(platform).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }
    const headers = formData.getHeaders({
      buildId: storeScreenshot.buildId,
      view: storeScreenshot.view,
      timestamp: storeScreenshot.timestamp.toISOString(),
    });
    const response: AxiosResponse<Screenshot> = await this.axios.post<Screenshot>(`screenshot/`, formData, {
      headers,
    });
    return this.success(response);
  }
}