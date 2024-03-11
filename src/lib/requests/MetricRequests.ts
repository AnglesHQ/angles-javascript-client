import { AxiosInstance } from 'axios';
import moment from 'moment';
import { BaseRequests } from './BaseRequests';
import {GroupingPeriods} from "../models/enum/GroupingPeriods";
import {PhaseMetrics} from "../models/response/PhaseMetrics";
import {ScreenshotMetrics} from "../models/response/ScreenshotMetrics";

export class MetricRequests extends BaseRequests {

  public constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance);
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
  public getPhaseMetrics(teamId: string, componentId: string, fromDate: Date, toDate: Date, groupingPeriod: GroupingPeriods): Promise<PhaseMetrics> {
    const url = new URL(this.axios.defaults.baseURL + `/metrics/phase?teamId=${teamId}`);
    if (componentId) { url.searchParams.append('componentId', componentId); }
    if (fromDate) { url.searchParams.append('fromDate', moment(fromDate).format('YYYY-MM-DD')); }
    if (toDate) { url.searchParams.append('toDate', moment(toDate).format('YYYY-MM-DD')); }
    if (groupingPeriod) { url.searchParams.append('groupingPeriod', groupingPeriod); }
    return this.get<PhaseMetrics>(url.toString());
  }

  /**
   *  Will retrieve screenshot metrics grouped by tags and views.
   *
   * @param view
   * @param tag
   * @param limit
   * @param thumbnail
   */
  public getScreenshotMetrics(view: string, tag: string, limit: number, thumbnail: boolean): Promise<ScreenshotMetrics> {
    const url = new URL(this.axios.defaults.baseURL + `/metrics/screenshot?`);
    if (view) { url.searchParams.append('view', view); }
    if (tag) { url.searchParams.append('tag', tag); }
    if (limit) { url.searchParams.append('limit', String(limit)); }
    if (thumbnail) { url.searchParams.append('thumbnail', String(thumbnail)); }
    return this.get<ScreenshotMetrics>(url.toString());
  }
}
