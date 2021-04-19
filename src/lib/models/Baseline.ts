import { Screenshot } from './Screenshot';
import { Platform } from './Platform';
import { IgnoreBox } from './IgnoreBox';

export class Baseline {
    screenshot:Screenshot;
    view: string;
    platform: Platform;
    screenHeight: number;
    screenWidth: number;
    ignoreBoxes: IgnoreBox[];
}
