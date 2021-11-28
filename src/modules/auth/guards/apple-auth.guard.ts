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
} from '../../../interfaces/auth.interface';
import { Request } from 'express';

@Injectable()
export class AppleAuthGuard implements CanActivate {
  constructor(private readonly apple: AppleStrategy) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token: string = <string>request.headers.authorization;
    if (!token) throw new UnauthorizedException();

    const formattedToken: string = token.split(' ')[1];
    const validateTokenResult: IdentityTokenSchema =
      await this.apple.ValidateTokenAndDecode(formattedToken);

    const userIdentifier: string = validateTokenResult.sub;
    const appleData: ProviderDataSchema = {
      nickName: userIdentifier,
      providerName: 'Apple',
    };
    request.body = { appleData: appleData };

    return true;
  }
}
