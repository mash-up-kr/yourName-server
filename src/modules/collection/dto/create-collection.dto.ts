import { PickType } from '@nestjs/swagger';
import { BgColor } from '../../../entities/bg-color.entity';
import { Collection } from '../../../entities/collection.entity';

export class CreateCollectionDto extends PickType(Collection, [
  'name',
  'description',
] as const) {
  bgcolor: BgColorDto;
}

class BgColorDto extends PickType(BgColor, [
  'color1',
  'color2',
  'color3',
] as const) {}
