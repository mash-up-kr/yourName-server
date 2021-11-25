import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseDto } from './common-response.dto';

export class DataEmptyResponse extends CommonResponseDto {
  @ApiProperty({ example: '{}', description: '빈 객체' })
  data: any;
}
