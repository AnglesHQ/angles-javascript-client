export class FindImageOptions {
  /** Minimum confidence (0-1) for a region to count as a match. Defaults to 0.8. */
  minConfidence?: number;
  /** Lower bound of the template scale sweep. Defaults to 0.75. */
  scaleMin?: number;
  /** Upper bound of the template scale sweep. Defaults to 1.25. */
  scaleMax?: number;
  /** Maximum number of matches to return (1-25). Defaults to 1. */
  maxMatches?: number;
  /** Match on luminance only, which is more tolerant of colour differences between devices. */
  grayscale?: boolean;
}
