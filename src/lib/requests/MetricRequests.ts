import { AxiosResponse, AxiosInstance } from 'axios';
import moment from 'moment';
import { BaseRequests } from './BaseRequests';
import {GroupingPeriods} from "../models/enum/GroupingPeriods";
import {PhaseMetrics} from "../models/response/PhaseMetrics";
import {ScreenshotMetrics} from "../models/response/ScreenshotMetrics";

export class MetricRequests extends BaseRequests {
  private axios: AxiosInstance;

  public constructor(axiosInstance: AxiosInstance) {
    super();
    this.axios = axiosInstance;
  }

  /**
   * Will retrieve metrics for a specific period and will group it by a specified period
   *
   * @param teamId
   * @param componentId
   * @param fromDate
   * @param toDate
   * @param groupingPeriod
   */
  public async getPhaseMetrics(teamId: string, componentId: string, fromDate: Date, toDate: Date, groupingPeriod: GroupingPeriods): Promise<PhaseMetrics> {
    const url = new URL(this.axios.defaults.baseURL + `/metrics/phase?teamId=${teamId}`);
    if (componentId) { url.searchParams.append('componentId', componentId); }
    if (fromDate) { url.searchParams.append('fromDate', moment(fromDate).format('YYYY-MM-DD')); }
    if (toDate) { url.searchParams.append('toDate', moment(toDate).format('YYYY-MM-DD')); }
    if (groupingPeriod) { url.searchParams.append('groupingPeriod', groupingPeriod); }
    const response: AxiosResponse<PhaseMetrics> = await this.axios.get<PhaseMetrics>(url.toString());
    return this.success(response);
  }

  /**
   * Will retrieve screenshot metrics for a specific period. You can limit the results by providing a "topNumber"
   * e.g. if topNumber is 10, then for each metric only the top 10 values will be returned.
   *
   * This API will return metrics for the top view, tag, platform and resolution.
   *
   * @param fromDate
   * @param toDate
   * @param topNumber
   */
  public async getScreenshotMetrics(fromDate: Date, toDate: Date, topNumber: number): Promise<ScreenshotMetrics> {
    const url = new URL(this.axios.defaults.baseURL + `/metrics/screenshot?`);
    if (fromDate) { url.searchParams.append('fromDate', moment(fromDate).format('YYYY-MM-DD')); }
    if (toDate) { url.searchParams.append('toDate', moment(toDate).format('YYYY-MM-DD')); }
    if (topNumber) { url.searchParams.append('topNumber', String(topNumber)); }
    const response: AxiosResponse<ScreenshotMetrics> = await this.axios.get<ScreenshotMetrics>(url.toString());
    return this.success(response);
  }
}
