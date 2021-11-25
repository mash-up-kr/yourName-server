import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseDto } from 'src/common/dto/common-response.dto';

class ListAddNamecardResponse {
  @ApiProperty({
    example: [1, 2, 3],
    description: '도감-명함 관계 테이블에서의 ID',
    type: [Number],
  })
  list: number[];
}

export class AddNamecardResponseDto extends CommonResponseDto {
  @ApiProperty()
  data: ListAddNamecardResponse;
}
