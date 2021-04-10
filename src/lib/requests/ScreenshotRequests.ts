import { AxiosResponse, AxiosInstance } from 'axios';
import FormData from 'form-data';
import { BaseRequests } from './BaseRequests';
import { Screenshot } from '../models/Types';
import { StoreScreenshot } from '../models/RequestTypes';

export class ScreenshotRequests extends BaseRequests {

  private axios: AxiosInstance;
  private path = require('path');
  private fs = require('fs');

  public constructor (axiosInstance: AxiosInstance) {
    super();
    this.axios = axiosInstance;
  }

  public async getScreenshot(screenshotId:string): Promise<Screenshot> {
    const response: AxiosResponse<Screenshot> = await this.axios.get<Screenshot>(`screenshot/${screenshotId}`);
    return this.success(response);
  }

  public async saveScreenshot(storeScreenshot: StoreScreenshot): Promise<Screenshot> {
    const formData = new FormData();
    const fullPath = this.path.resolve(storeScreenshot.filePath);
    const fileStream = this.fs.createReadStream(fullPath);
    formData.append('screenshot', fileStream);
    const headers = formData.getHeaders(
      {
        buildId: storeScreenshot.buildId,
        view: storeScreenshot.view,
        timestamp: storeScreenshot.timestamp.toISOString()
      }
    );
    const response: AxiosResponse<Screenshot> = await this.axios.post<Screenshot>(`screenshot/`,
      formData,
      {
        headers: headers
      }
    );
    return this.success(response);
  }

}
