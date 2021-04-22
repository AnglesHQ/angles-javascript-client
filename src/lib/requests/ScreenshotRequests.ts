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

  public async saveScreenshot(storeScreenshot: StoreScreenshot): Promise<Screenshot> {
    const formData = new FormData();
    const fullPath = this.path.resolve(storeScreenshot.filePath);
    const fileStream = this.fs.createReadStream(fullPath);
    formData.append('screenshot', fileStream);
    const { buildId, view, timestamp, tags , platform } = storeScreenshot;
    formData.append("buildId", buildId);
    formData.append("view", view);
    formData.append("timestamp", timestamp.toISOString());
    if (tags) formData.append("tags", JSON.stringify(tags));
    if (platform) {
      Object.entries(platform).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }
    const response: AxiosResponse<Screenshot> = await this.axios.post<Screenshot>(`screenshot/`, formData, {
      headers: formData.getHeaders(),
    });
    return this.success(response);
  }

  /**
   * Retrieves the screenshots for a specified build
   * @param {string} buildId
   * @param {number} [limit=100]
   */
  public async getScreenshotsForBuild(buildId: string, limit: number) : Promise<Screenshot[]> {
    const defaultLimit = limit || 100;
    const response: AxiosResponse<Screenshot[]> = await this.axios.get<Screenshot[]>(`screenshot/`, {
      params: { buildId, limit: defaultLimit },
    });
    return this.success(response);
  }

  public async getScreenshots(screenshotIds: string[]) : Promise<Screenshot[]> {
    const response: AxiosResponse<Screenshot[]> = await this.axios.get<Screenshot[]>('screenshot/', {
      params: {
        screenshotIds: screenshotIds.join(',')
      }
    });
    return this.success(response);
  }

  public async getScreenshotHistoryByView(view: string, platformId: string, limit: number, offset: number) : Promise<Screenshot[]> {
    const response: AxiosResponse<Screenshot[]> = await this.axios.get('/screenshot/', {
      params: {
        view,
        platformId,
        limit,
        offset,
      },
    });
    return this.success(response);
  }

  public async getScreenshotsGroupedByPlatform(view: string, numberOfDays: number) : Promise<Screenshot[]> {
    const response: AxiosResponse<Screenshot[]> = await this.axios.get<Screenshot[]>('screenshot/grouped/platform', {
      params: { view, numberOfDays },
    });
    return this.success(response);
  }

  public async getScreenshotsGroupedByTag(tag: string, numberOfDays: number) : Promise<Screenshot[]> {
    const response: AxiosResponse<Screenshot[]> = await this.axios.get<Screenshot[]>('screenshot/grouped/tag', {
      params: { tag, numberOfDays },
    });
    return this.success(response);
  }

  public async getScreenshot(screenshotId: string): Promise<Screenshot> {
    const response: AxiosResponse<Screenshot> = await this.axios.get<Screenshot>(`screenshot/${screenshotId}`);
    return this.success(response);
  }

  // TODO: Delete screenshot

  // TODO: Update screenshot

  public async getScreenshotImage(screenshotId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await this.axios.get<AxiosResponse>(`screenshot/${screenshotId}/image`,
      { responseType: 'arraybuffer' });
    return this.success(response);
  }

  // TODO: Get screenshot compare Resemblejs JSON

  // TODO: get screenshot compare Resemblejs Image

  public async getBaselineCompareImage(screenshotId: string, cache: boolean): Promise<AxiosResponse> {
    const useCache = cache || false;
    const response: AxiosResponse = await this.axios.get<AxiosResponse>(`screenshot/${screenshotId}/baseline/compare/image/`,
      {
        params: { useCache },
        responseType: 'arraybuffer'
      });
    return this.success(response);
  }

  public async getBaselineCompare(screenshotId: string) : Promise<AxiosResponse> {
    const response: AxiosResponse = await this.axios.get<AxiosResponse>(`screenshot/${screenshotId}/baseline/compare/`);
    return this.success(response);
  }

}
