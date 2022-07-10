import { AxiosResponse, AxiosInstance } from 'axios';
import FormData from 'form-data';
import { BaseRequests } from './BaseRequests';
import { Screenshot } from '../models/Screenshot';
import { StoreScreenshot } from '../models/requests/StoreScreenshot';
import { ImageCompareResponse } from '../models/response/ImageCompareResponse';
import {DefaultResponse} from "../models/response/DefaultResponse";

export class ScreenshotRequests extends BaseRequests {

  private path = require('path');
  private fs = require('fs');

  public constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance);
  }

  public saveScreenshot(storeScreenshot: StoreScreenshot): Promise<Screenshot> {
    const formData = new FormData();
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
    const fullPath = this.path.resolve(storeScreenshot.filePath);
    const fileStream = this.fs.createReadStream(fullPath);
    formData.append('screenshot', fileStream);
    return this.post<Screenshot>(`screenshot/`, formData, {
      headers: formData.getHeaders(),
    });
  }

  /**
   * Retrieves the screenshots for a specified build
   * @param {string} buildId
   * @param {number} [limit=100]
   */
  public getScreenshotsForBuild(buildId: string, limit: number) : Promise<Screenshot[]> {
    const params:any = { buildId };
    if (limit) { params.limit = limit; }
    return this.get<Screenshot[]>(`screenshot/`, {
      params,
    });
  }

  public getScreenshots(screenshotIds: string[]) : Promise<Screenshot[]> {
    return this.get<Screenshot[]>('screenshot/', {
      params: {
        screenshotIds: screenshotIds.join(',')
      }
    });
  }

  public getScreenshotHistoryByView(view: string, platformId: string, limit: number, offset: number) : Promise<Screenshot[]> {
    return this.get('/screenshot/', {
      params: {
        view,
        platformId,
        limit,
        offset,
      },
    });
  }

  public getScreenshotsGroupedByPlatform(view: string, numberOfDays: number) : Promise<Screenshot[]> {
    return this.get<Screenshot[]>('screenshot/grouped/platform', {
      params: { view, numberOfDays },
    });
  }

  public getScreenshotsGroupedByTag(tag: string, numberOfDays: number) : Promise<Screenshot[]> {
    return this.get<Screenshot[]>('screenshot/grouped/tag', {
      params: { tag, numberOfDays },
    });
  }

  public getScreenshot(screenshotId: string): Promise<Screenshot> {
    return this.get<Screenshot>(`screenshot/${screenshotId}`);
  }

  public deleteScreenshot(screenshotId: string): Promise<DefaultResponse> {
    return this.delete<DefaultResponse>(`screenshot/${screenshotId}`);
  }

  // TODO: Update screenshot

  public getScreenshotImage(screenshotId: string): Promise<AxiosResponse> {
    return this.get<AxiosResponse>(`screenshot/${screenshotId}/image`,
      { responseType: 'arraybuffer' });
  }

  public getDynamicBaselineImage(screenshotId: string, numberOfImagesToCompare: number): Promise<Screenshot> {
    let path = `screenshot/${screenshotId}/dynamic-baseline`;
    if (numberOfImagesToCompare && numberOfImagesToCompare > 0) {
      path = `${path}&numberOfImagesToCompare=${numberOfImagesToCompare}`
    }
    return this.get<Screenshot>(path);
  }

  // TODO: Get screenshot compare Resemblejs JSON

  // TODO: get screenshot compare Resemblejs Image

  public getBaselineCompareImage(screenshotId: string, cache: boolean): Promise<AxiosResponse> {
    const useCache = cache || false;
    return this.get<AxiosResponse>(`screenshot/${screenshotId}/baseline/compare/image/`,
      {
        params: { useCache },
        responseType: 'arraybuffer'
      });
  }

  public getBaselineCompare(screenshotId: string) : Promise<ImageCompareResponse> {
    return this.get<ImageCompareResponse>(`screenshot/${screenshotId}/baseline/compare/`);
  }

}
