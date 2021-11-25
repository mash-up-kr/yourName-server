import { ApiProperty, PickType } from '@nestjs/swagger';
import { CommonResponseDto } from 'src/common/dto/common-response.dto';
import { Image } from 'src/entities/image.entity';

class ImageKeyResponseSchema extends PickType(Image, ['key']) {}

export class ImageUploadResponseDto extends CommonResponseDto {
  @ApiProperty()
  data: ImageKeyResponseSchema;
}
