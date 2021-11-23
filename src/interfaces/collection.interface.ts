import { BgColorSchema } from './namecard.interface';

export interface CollectionSchema {
  id: number;
  name: string;
  description: string;
  bgColor: BgColorSchema;
}
