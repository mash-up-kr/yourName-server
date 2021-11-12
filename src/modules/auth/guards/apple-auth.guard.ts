import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AppleStrategy } from '../strategies/apple.strategy';
import {
  IdentityTokenSchema,
  ProviderDataSchema,
} from '../interfaces/interfaces';

@Injectable()
export class AppleAuthGuard implements CanActivate {
  constructor(private readonly apple: AppleStrategy) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string = <string>request.headers.authorization;
    if (!token) throw new UnauthorizedException();

    const validateTokenResult: IdentityTokenSchema =
      await this.apple.ValidateTokenAndDecode(token);

    const nickName: string = validateTokenResult.email.split('@')[0]; //IOS 작업 후 수정
    const appleData: ProviderDataSchema = {
      nickName: nickName,
      providerName: 'Apple',
    };
    request.body = { appleData: appleData };

    return true;
  }
}
