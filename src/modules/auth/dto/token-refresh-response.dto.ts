import { ApiProperty, PickType } from '@nestjs/swagger';
import { CommonResponseDto } from 'src/common/dto/common-response.dto';
import { LoginResSchema } from 'src/modules/auth/dto/login-response.dto';

class AccessTokenSchema extends PickType(LoginResSchema, ['accessToken']) {}

export class TokenRefreshResponseDto extends CommonResponseDto {
  @ApiProperty()
  data: AccessTokenSchema;
}
