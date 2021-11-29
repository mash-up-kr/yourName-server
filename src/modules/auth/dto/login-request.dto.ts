import { PickType } from '@nestjs/swagger';
import { LoginResSchema } from './login-response.dto';

export class LoginRequestDto extends PickType(LoginResSchema, [
  'accessToken',
]) {}
