import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseDto } from 'src/common/dto/common-response.dto';

class NameCardIdSchema {
  @ApiProperty({ example: 11, description: '생성된 명함 id' })
  nameCardId: number;
}

export class CreateNameCardResponseDto extends CommonResponseDto {
  @ApiProperty()
  data: NameCardIdSchema;
}
