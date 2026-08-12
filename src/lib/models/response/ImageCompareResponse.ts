export class DiffRegion {
  x: number;
  y: number;
  width: number;
  height: number;
  /** Number of changed pixels inside the region. */
  pixels: number;
}

export class ImageCompareResponse {
  /** Algorithm that produced this result: 'pixel', 'ssim', or 'phash'. */
  algorithm?: string;
  isSameDimensions: boolean;
  rawMisMatchPercentage: number;
  misMatchPercentage: number;
  analysisTime: number;
  /** SSIM score in [-1, 1] (1 = identical); present when algorithm is 'ssim'. */
  ssim?: number;
  /** Normalised perceptual-hash distance (0-1); present when algorithm is 'phash'. */
  distance?: number;
  /** Clustered change regions; present when requested with regions=true (pixel only). */
  regions?: DiffRegion[];
}
