import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { number } from 'joi';

export class AddNamecardToCollectionsDto {
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  @ApiProperty({ type: number, description: '도감 ID들', example: '[1,2,3]' })
  collectionIds: number[];
}
