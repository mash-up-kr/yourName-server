import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      IgnoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    return await this.authService.isRefreshTokenMatching(payload);
  }
}
