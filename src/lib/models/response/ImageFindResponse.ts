export class ImageFindMatch {
  /** Left edge of the matched region, in original screenshot pixels. */
  x: number;
  /** Top edge of the matched region, in original screenshot pixels. */
  y: number;
  width: number;
  height: number;
  /** Normalized cross-correlation score (0-1). */
  confidence: number;
  /** Template scale at which the match was found. */
  scale: number;
}

export class ImageFindResponse {
  matches: ImageFindMatch[];
  bestMatch: ImageFindMatch | null;
  imageDimensions: { width: number, height: number };
  templateDimensions: { width: number, height: number };
  /** Search duration in milliseconds. */
  analysisTime: number;
}
