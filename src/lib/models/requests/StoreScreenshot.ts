import { ScreenshotPlatform } from './ScreenshotPlatform';

export class StoreScreenshot {
  buildId: string;
  view: string;
  timestamp: Date;
  filePath: string;
  tags: string[]
  platform: ScreenshotPlatform;
}
