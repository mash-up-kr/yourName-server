export interface IFile {
  mimeType: string;
  originalname: string;
  buffer: Buffer;
  encoding?: string;
  fieldName?: string;
  size?: number;
}
