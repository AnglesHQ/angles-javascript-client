export class ScreenshotPlatform {
  platformName: string;
  platformVersion: string;
  browserName: string;
  browserVersion: string;
  deviceName: string;

  constructor(platformName: string, platformVersion: string, browserName: string, browserVersion: string, deviceName: string) {
    this.platformName = platformName;
    this.platformVersion = platformVersion;
    this.browserName = browserName;
    this.browserVersion = browserVersion;
    this.deviceName = deviceName;
  }

}

