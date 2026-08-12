import { AxiosResponse, AxiosInstance } from 'axios';
import FormData from 'form-data';
import { BaseRequests } from './BaseRequests';
import { Screenshot } from '../models/Screenshot';
import { StoreScreenshot } from '../models/requests/StoreScreenshot';
import { ImageCompareResponse } from '../models/response/ImageCompareResponse';
import { ImageFindResponse } from '../models/response/ImageFindResponse';
import { FindImageOptions } from '../models/requests/FindImageOptions';
import { CompareOptions } from '../models/requests/CompareOptions';
import {DefaultResponse} from "../models/response/DefaultResponse";

export class ScreenshotRequests extends BaseRequests {

  public constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance);
  }

  public saveScreenshot(storeScreenshot: StoreScreenshot): Promise<Screenshot> {
    const path = require('path');
    const fs = require('fs');
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
    const fullPath = path.resolve(storeScreenshot.filePath);
    const fileName = path.basename(fullPath);
    const fileStream = fs.createReadStream(fullPath);
    formData.append('screenshot', fileStream, fileName);
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

  public getScreenshotViews(view: string, limit: number) : Promise<string[]> {
    return this.get<string[]>('screenshot/views', {
      params: {
        view,
        limit,
      }
    });
  }

  public getScreenshotTags(tag: string, limit: number) : Promise<string[]> {
    return this.get<string[]>('screenshot/tags', {
      params: {
        tag,
        limit,
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
      path = `${path}?numberOfImagesToCompare=${numberOfImagesToCompare}`
    }
    return this.get<Screenshot>(path);
  }

  /**
   * Compares two stored screenshots and returns the comparison statistics.
   * @param {CompareOptions} [options] - algorithm/threshold/regions
   */
  public compareScreenshots(screenshotId: string, screenshotCompareId: string, options?: CompareOptions): Promise<ImageCompareResponse> {
    return this.get<ImageCompareResponse>(`screenshot/${screenshotId}/compare/${screenshotCompareId}`, {
      params: options,
    });
  }

  /**
   * Compares two stored screenshots and resolves with the diff image.
   */
  public compareScreenshotsImage(screenshotId: string, screenshotCompareId: string, cache?: boolean, options?: CompareOptions): Promise<AxiosResponse> {
    return this.get<AxiosResponse>(`screenshot/${screenshotId}/compare/${screenshotCompareId}/image`, {
      params: { useCache: cache || false, ...options },
      responseType: 'arraybuffer',
    });
  }

  public getBaselineCompareImage(screenshotId: string, cache: boolean, options?: CompareOptions): Promise<AxiosResponse> {
    const useCache = cache || false;
    return this.get<AxiosResponse>(`screenshot/${screenshotId}/baseline/compare/image/`,
      {
        params: { useCache, ...options },
        responseType: 'arraybuffer'
      });
  }

  public getBaselineCompare(screenshotId: string, options?: CompareOptions) : Promise<ImageCompareResponse> {
    return this.get<ImageCompareResponse>(`screenshot/${screenshotId}/baseline/compare/`, {
      params: options,
    });
  }

  /**
   * Finds a stored screenshot (the template) within another stored screenshot using
   * multi-scale template matching, and returns the matched region(s).
   * @param {string} screenshotId - the screenshot to search in
   * @param {string} templateScreenshotId - the screenshot to search for
   * @param {FindImageOptions} [options]
   */
  public findImageInScreenshot(screenshotId: string, templateScreenshotId: string, options?: FindImageOptions): Promise<ImageFindResponse> {
    return this.get<ImageFindResponse>(`screenshot/${screenshotId}/find/${templateScreenshotId}`, {
      params: options,
    });
  }

  /**
   * Same search as findImageInScreenshot, but resolves with the screenshot image with
   * the matched region(s) outlined.
   */
  public findImageInScreenshotImage(screenshotId: string, templateScreenshotId: string, options?: FindImageOptions): Promise<AxiosResponse> {
    return this.get<AxiosResponse>(`screenshot/${screenshotId}/find/${templateScreenshotId}/image`, {
      params: options,
      responseType: 'arraybuffer',
    });
  }

  /**
   * Finds a local template image file within a stored screenshot using multi-scale
   * template matching. The template is uploaded with the request and not stored.
   * @param {string} screenshotId - the screenshot to search in
   * @param {string} templateFilePath - path of the local template image to search for
   * @param {FindImageOptions} [options]
   */
  public findUploadedImageInScreenshot(screenshotId: string, templateFilePath: string, options?: FindImageOptions): Promise<ImageFindResponse> {
    const path = require('path');
    const fs = require('fs');
    const formData = new FormData();
    const fullPath = path.resolve(templateFilePath);
    formData.append('template', fs.createReadStream(fullPath), path.basename(fullPath));
    return this.post<ImageFindResponse>(`screenshot/${screenshotId}/find`, formData, {
      headers: formData.getHeaders(),
      params: options,
    });
  }

}
