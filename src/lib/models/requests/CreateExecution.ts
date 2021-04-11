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
}
