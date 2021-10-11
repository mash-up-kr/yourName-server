import { Controller, Get, Put, Req, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppleAuthGuard } from './guards/apple-auth.guard';
import { ApiDocs } from './auth.docs';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './guards/jwt-refresh-auth.guard';
import { KakaoAuthGuard } from './guards/kakao-auth.guard';
import { ProviderDataSchema } from './interfaces/interfaces';

@Controller()
@ApiTags('Auth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(KakaoAuthGuard)
  @Post('kakao-login')
  @ApiDocs.kakaoLogin('카카오 로그인')
  async kakaoLogin(@Req() req: any) {
    const kakaoData: any = req.body.kakaoData;
    const user = await this.authService.createUser(
      kakaoData.nickName,
      kakaoData.providerName,
    );
    return await this.authService.login(user);
  }

  @UseGuards(AppleAuthGuard)
  @Post('apple-login')
  @ApiDocs.appleLogin('애플 로그인')
  async appleLogin(@Req() req: any) {
    const appleData: ProviderDataSchema = req.body.appleData;
    const user = await this.authService.createUser(
      appleData.nickName,
      appleData.providerName,
    );
    return await this.authService.login(user);
  }

  @Put('logout')
  @ApiDocs.logout('로그아웃')
  async logout(@Req() req: any): Promise<void> {
    await this.authService.logout(req.user);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('token-refresh')
  @ApiDocs.refreshToken('토큰 리프레시')
  async refreshToken(@Req() req: any) {
    const newAccessToken = await this.authService.refresh(req.user);
    return { accessToken: newAccessToken };
  }
}