import { Action } from '../Action';
import { Platform } from '../Platform';

export class CreateExecution {
  title: string;
  suite: string;
  feature: string;
  build: string;
  actions: Action[];
  platforms: Platform[];
  tags: string[];
  meta: Map<string, string>;
  /**
   * Ids of files attached to the whole test (see AnglesReporter.attachFile): a video, a
   * trace, a HAR file or a console log.
   */
  attachments?: string[];
}
