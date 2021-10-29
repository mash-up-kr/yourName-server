import { PickType } from '@nestjs/swagger';
import { Collection } from '../../../entities/collection.entity';

export class CreateCollectionDto extends PickType(Collection, [
  'name',
  'description',
] as const) {}
