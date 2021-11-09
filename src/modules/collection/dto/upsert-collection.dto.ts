import { PickType } from '@nestjs/swagger';
import { Collection } from '../../../entities/collection.entity';

export class UpsertCollectionDto extends PickType(Collection, [
  'name',
  'description',
  'bgColorId',
] as const) {}
