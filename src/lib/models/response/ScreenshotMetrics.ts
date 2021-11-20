import {Metric} from "./Metric";

export class ScreenshotMetrics {
    toDate: Date;
    fromDate: Date;
    count: number;
    views: Metric[];
    tags: Metric[];
    platforms: Metric[];
    resolutions: Metric[];
}
