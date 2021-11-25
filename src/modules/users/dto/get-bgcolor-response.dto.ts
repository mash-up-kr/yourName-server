import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseDto } from 'src/common/dto/common-response.dto';

class BgColorResponseSchema {
  @ApiProperty({ example: 3, description: '배경색 ID' })
  id: number;

  @ApiProperty({
    example: '[#FFCBFD]',
    description: '배경색 값',
    type: [String],
  })
  value: string[];

  @ApiProperty({ example: true })
  isLock: boolean;
}

class GetBgcolorResponseListSchema {
  @ApiProperty({ type: [BgColorResponseSchema] })
  list: BgColorResponseSchema[];
}

export class GetBgcolorResponseDto extends CommonResponseDto {
  @ApiProperty()
  data: GetBgcolorResponseListSchema;
}
