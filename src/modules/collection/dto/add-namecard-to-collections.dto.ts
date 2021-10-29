import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddNamecardToCollectionsDto {
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  collectionIds: number[];
}
