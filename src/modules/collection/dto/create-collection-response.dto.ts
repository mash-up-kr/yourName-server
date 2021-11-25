import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseDto } from 'src/common/dto/common-response.dto';

class CollectionIdSchema {
  @ApiProperty({ example: 6, description: '추가된 도감 id' })
  collectionId: number;
}

export class CreateCollectionResponseDto extends CommonResponseDto {
  @ApiProperty({ example: 6, description: '추가된 도감 id' })
  data: CollectionIdSchema;
}
