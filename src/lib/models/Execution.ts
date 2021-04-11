import { Build } from './Build';
import { Platform } from './Platform';
import { ExecutionStates } from './enum/ExecutionStates';
import { Action } from './Action';

export class Execution {
  _id: string;
  title: string;
  suite: string;
  feature: string;
  build: Build;
  start: Date;
  end: Date;
  actions: Action[];
  platforms: Platform[];
  tags: string[];
  meta: Map<string, string>;
  status: ExecutionStates;
}
