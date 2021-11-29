import { PickType } from '@nestjs/swagger';
import { LoginResSchema } from './login-response.dto';

export class TokenRefreshRequestDto extends PickType(LoginResSchema, [
  'refreshToken',
]) {}
