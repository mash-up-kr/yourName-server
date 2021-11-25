import { ApiProperty, PickType } from '@nestjs/swagger';
import { CommonResponseDto } from 'src/common/dto/common-response.dto';
import { Tmi } from 'src/entities/tmi.entity';

class GetTmisResponseSchema extends PickType(Tmi, ['id', 'type', 'name']) {
  @ApiProperty({
    example: 'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_video.png',
  })
  iconUrl: string;
}

class GetTmisResponseListSchema {
  @ApiProperty({ type: [GetTmisResponseSchema] })
  list: GetTmisResponseSchema[];
}

export class GetTmisResponseDto extends CommonResponseDto {
  @ApiProperty()
  data: GetTmisResponseListSchema;
}
