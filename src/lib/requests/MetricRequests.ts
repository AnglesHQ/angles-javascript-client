import { AxiosInstance } from 'axios';
import moment from 'moment';
import { BaseRequests } from './BaseRequests';
import {GroupingPeriods} from "../models/enum/GroupingPeriods";
import {PhaseMetrics} from "../models/response/PhaseMetrics";

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
}
