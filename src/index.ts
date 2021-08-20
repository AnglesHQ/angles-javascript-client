import { AnglesReporterClass } from './lib/AnglesReporter';
import { BuildRequests } from './lib/requests/BuildRequests';
import { TeamRequests } from './lib/requests/TeamRequests';
import { EnvironmentRequests } from './lib/requests/EnvironmentRequests';
import { ScreenshotRequests } from './lib/requests/ScreenshotRequests';
import { ExecutionRequests } from './lib/requests/ExecutionRequests';
import { BaselineRequests} from './lib/requests/BaselineRequests';
import { MetricRequests} from './lib/requests/MetricRequests';

export { BuildRequests, TeamRequests, EnvironmentRequests, ScreenshotRequests, ExecutionRequests, BaselineRequests, MetricRequests };
export default AnglesReporterClass.getInstance();
