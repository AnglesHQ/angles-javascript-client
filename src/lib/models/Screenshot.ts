import { Build } from './Build';
import { Platform } from './Platform';

export class Screenshot {
  _id: string;
  build: Build;
  thumbnail: string;
  timestamp: Date;
  path: string;
  view: string;
  height: number;
  width: number;
  platform: Platform;
  platformId: string;
  tags: string[];
}
