import {AxiosResponse, AxiosInstance, AxiosError} from 'axios';
import FormData from 'form-data';
import { BaseRequests } from './BaseRequests';
import { Screenshot } from '../models/Screenshot';
import { StoreScreenshot } from '../models/requests/StoreScreenshot';
import { ScreenshotPlatform } from '../models/requests/ScreenshotPlatform';
import { ImageCompareResponse } from '../models/response/ImageCompareResponse';
import {DefaultResponse} from "../models/response/DefaultResponse";

export class ScreenshotRequests extends BaseRequests {
  private axios: AxiosInstance;
  private path = require('path');
  private fs = require('fs');

  public constructor(axiosInstance: AxiosInstance) {
    super();
    this.axios = axiosInstance;
  }

  public saveScreenshot(storeScreenshot: StoreScreenshot): Promise<Screenshot> {
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
    return this.axios.post<Screenshot>(`screenshot/`, formData, {
      headers: formData.getHeaders(),
    })
      .then((response: AxiosResponse<Screenshot>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
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
    return this.axios.get<Screenshot[]>(`screenshot/`, {
        params,
      })
      .then((response: AxiosResponse<Screenshot[]>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

  public getScreenshots(screenshotIds: string[]) : Promise<Screenshot[]> {
    return this.axios.get<Screenshot[]>('screenshot/', {
        params: {
          screenshotIds: screenshotIds.join(',')
        }
      })
      .then((response: AxiosResponse<Screenshot[]>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

  public getScreenshotHistoryByView(view: string, platformId: string, limit: number, offset: number) : Promise<Screenshot[]> {
    return this.axios.get('/screenshot/', {
        params: {
          view,
          platformId,
          limit,
          offset,
        },
      })
      .then((response: AxiosResponse<Screenshot[]>) => {
        return this.success(response);
      })
      .catch((error:AxiosError) => {
        return Promise.reject(error);
      })
  }

  public getScreenshotsGroupedByPlatform(view: string, numberOfDays: number) : Promise<Screenshot[]> {
    return this.axios.get<Screenshot[]>('screenshot/grouped/platform', {
        params: { view, numberOfDays },
      })
      .then((response: AxiosResponse<Screenshot[]>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      })
  }

  public getScreenshotsGroupedByTag(tag: string, numberOfDays: number) : Promise<Screenshot[]> {
    return this.axios.get<Screenshot[]>('screenshot/grouped/tag', {
      params: { tag, numberOfDays },
    })
      .then((response: AxiosResponse<Screenshot[]>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      })
  }

  public getScreenshot(screenshotId: string): Promise<Screenshot> {
    return this.axios.get<Screenshot>(`screenshot/${screenshotId}`)
      .then((response: AxiosResponse<Screenshot>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

  public deleteScreenshot(screenshotId: string): Promise<DefaultResponse> {
    return this.axios.delete<DefaultResponse>(`screenshot/${screenshotId}`)
      .then((response: AxiosResponse<DefaultResponse>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

  // TODO: Update screenshot

  public getScreenshotImage(screenshotId: string): Promise<AxiosResponse> {
    return this.axios.get<AxiosResponse>(`screenshot/${screenshotId}/image`,
      { responseType: 'arraybuffer' })
      .then((response: AxiosResponse) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

  // TODO: Get screenshot compare Resemblejs JSON

  // TODO: get screenshot compare Resemblejs Image

  public getBaselineCompareImage(screenshotId: string, cache: boolean): Promise<AxiosResponse> {
    const useCache = cache || false;
    return this.axios.get<AxiosResponse>(`screenshot/${screenshotId}/baseline/compare/image/`,
      {
        params: { useCache },
        responseType: 'arraybuffer'
      })
      .then((response: AxiosResponse) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

  public getBaselineCompare(screenshotId: string) : Promise<ImageCompareResponse> {
    return this.axios.get<ImageCompareResponse>(`screenshot/${screenshotId}/baseline/compare/`)
      .then((response: AxiosResponse<ImageCompareResponse>) => {
        return this.success(response);
      })
      .catch((error: AxiosError) => {
        return Promise.reject(error);
      });
  }

}
