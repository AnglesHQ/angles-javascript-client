/**
 * What a test attachment holds. Decided by the server from the file extension:
 * .log/.txt (log), .json, .har, .webm/.mp4 (video), .zip (trace when the name contains
 * "trace", otherwise archive), .html/.htm and .png/.jpg/.jpeg/.gif/.webp (image).
 */
export type TestAttachmentKind = 'image' | 'log' | 'json' | 'har' | 'video' | 'trace' | 'archive' | 'html';

/**
 * A file an automated test uploaded against its build: a log, HAR file, video, trace,
 * HTML snapshot or image. List its id on the execution (or a step) to show it there.
 */
export class TestAttachment {
  _id: string;
  kind: TestAttachmentKind;
  /** The uploaded file name, for display. */
  originalName: string;
  /** The type the file is served with, decided from its extension. */
  mimeType: string;
  size: number;
  build: string;
  /** The execution that listed this attachment, once it has been saved. */
  execution?: string;
  createdAt: Date;
}
