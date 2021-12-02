import { ApiProperty, PickType } from '@nestjs/swagger';
import { CommonResponseDto } from 'src/common/dto/common-response.dto';
import { Collection } from 'src/entities/collection.entity';

export class BgColorResponseSchema {
  @ApiProperty({ example: 1, description: '배경색 ID' })
  id: number;

  @ApiProperty({
    example: ['#FFCBFD', '#CFD3RE'],
    description: '배경색 값',
    type: [String],
  })
  value: string[];
}

class CollectionResponseSchema extends PickType(Collection, [
  'id',
  'name',
  'description',
]) {
  @ApiProperty()
  bgColor: BgColorResponseSchema;

  @ApiProperty({ example: 3 })
  numberOfNameCards: number;
}

class ListCollectionResponseSchema {
  @ApiProperty({ type: [CollectionResponseSchema] })
  list: [CollectionResponseSchema];
}

export class GetCollectionResponseDto extends CommonResponseDto {
  @ApiProperty()
  data: ListCollectionResponseSchema;
}
