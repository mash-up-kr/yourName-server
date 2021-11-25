import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseDto } from 'src/common/dto/common-response.dto';
import { User } from 'src/entities/user.entity';

class OnboardingInfoSchema {
  @ApiProperty({
    example: '첫 번째 미츄 만들기',
    description: '온보딩 퀘스트 이름',
  })
  title: string;

  @ApiProperty({ example: 'WAIT', description: '온보딩 퀘스트 진행 정보' })
  status: string;
}

export class LoginResSchema {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsIm5pY2tOYW1lIjoi7J207Jew7KSRIiwiaWF0IjoxNjM3NTYzMjUxLCJleHAiOjE2Mzc1NjMzMTF9.ClPdYidGiHXExASaNgdgOdnm_oAwICN7x5x3DJS8Dp4',
    description: 'Access Token',
  })
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsIm5pY2tOYW1lIjoi7J207Jew7KSRIiwiaWF0IjoxNjM3NTYzMjUxLCJleHAiOjE2Mzc1NjMzNzF9.VUYpzwC_8aujh8FgEfOCCh5mgG90UHckQC4U_2v0xdU',
    description: 'Refresh Token',
  })
  refreshToken: string;

  @ApiProperty()
  user: User;

  @ApiProperty({ type: [OnboardingInfoSchema] })
  userOnboarding: OnboardingInfoSchema[];
}

export class LoginResponseDto extends CommonResponseDto {
  @ApiProperty()
  data: LoginResSchema;
}
