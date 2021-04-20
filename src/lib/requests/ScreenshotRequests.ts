import { AxiosResponse, AxiosInstance } from 'axios';
import FormData from 'form-data';
import { BaseRequests } from './BaseRequests';
import { Screenshot } from '../models/Screenshot';
import { StoreScreenshot } from '../models/requests/StoreScreenshot';
import { ScreenshotPlatform } from '../models/requests/ScreenshotPlatform';
import { UpdateScreenshot } from '../models/requests/UpdateScreenshot';
import {StoreScreenshotHeaders} from "../models/requests/StoreScreenshotHeaders";

export class ScreenshotRequests extends BaseRequests {
  private axios: AxiosInstance;
  private path = require('path');
  private fs = require('fs');

  public constructor(axiosInstance: AxiosInstance) {
    super();
    this.axios = axiosInstance;
  }

  public async saveScreenshot(storeScreenshot: StoreScreenshot, storeScreenshotHeaders: StoreScreenshotHeaders): Promise<Screenshot> {
    const formData = new FormData();
    const fullPath = this.path.resolve(storeScreenshot.filePath);
    const fileStream = this.fs.createReadStream(fullPath);
    formData.append('screenshot', fileStream);
    if (storeScreenshot.platform !== undefined) {
      Object.entries(storeScreenshot.platform).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }
    if (storeScreenshot.tags !== undefined) {
      formData.append('tags', storeScreenshot.tags.toString());
    }
    const headers = formData.getHeaders({
      buildId: storeScreenshotHeaders.buildId,
      view: storeScreenshotHeaders.view,
      timestamp: storeScreenshotHeaders.timestamp.toISOString(),
    });
    const response: AxiosResponse<Screenshot> = await this.axios.post<Screenshot>(`screenshot/`, formData, {
      headers,
    });
    return this.success(response);
  }

  public async updateScreenshot(screenshotId: string, screenshotDetails: UpdateScreenshot): Promise<Screenshot> {
    const response: AxiosResponse<Screenshot> = await this.axios.put<Screenshot>(`screenshot/${screenshotId}`, screenshotDetails);
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
