import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InvalidTokenError } from 'jwt-decode';
import { KaKaoStrategy } from '../strategies/kakao.strategy';
import { ProviderDataSchema } from '../../../interfaces/auth.interface';
import { Request } from 'express';

@Injectable()
export class KakaoAuthGuard implements CanActivate {
  constructor(private readonly kakao: KaKaoStrategy) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token: string = <string>request.headers.authorization;
    if (!token) throw new UnauthorizedException();

    const validateTokenResult: any = await this.kakao.ValidateTokenAndDecode(
      token,
    );
    if (!validateTokenResult.id) throw new InvalidTokenError();

    const kakaoData: ProviderDataSchema = {
      nickName: validateTokenResult.properties.nickname,
      providerName: 'Kakao',
    };
    request.body = { kakaoData: kakaoData };

    return true;
  }
}
