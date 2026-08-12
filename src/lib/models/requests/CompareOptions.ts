export class CompareOptions {
  /** Comparison algorithm: 'pixel' (default), 'ssim', or 'phash' (JSON endpoints only). */
  algorithm?: 'pixel' | 'ssim' | 'phash';
  /** Per-pixel colour-distance threshold (0-1, pixel algorithm only). Defaults to 0.5. */
  threshold?: number;
  /** When true (pixel algorithm only), changed pixels are clustered into regions. */
  regions?: boolean;
}
