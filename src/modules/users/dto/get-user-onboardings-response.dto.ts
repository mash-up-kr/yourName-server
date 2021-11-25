import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseDto } from 'src/common/dto/common-response.dto';

class GetsUserOnboardingSchema {
  @ApiProperty({ example: 'WAIT' })
  status: string;

  @ApiProperty({
    example:
      'https://erme.s3.ap-northeast-2.amazonaws.com/user_onboarding/Gradient1_lock.png',
  })
  imageUrl: string;
}

class GetsUserOnboardingListSchema {
  @ApiProperty({ type: [GetsUserOnboardingSchema] })
  list: GetsUserOnboardingSchema[];
}

export class GetUserOnboardingsResponseDto extends CommonResponseDto {
  @ApiProperty()
  data: GetsUserOnboardingListSchema;
}
