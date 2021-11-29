import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { DataEmptyResponse } from 'src/common/dto/data-empty-response.dto';
import { SwaggerMethodDoc } from '../../swagger/swagger-method-doc-type';
import { AuthController } from './auth.controller';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { TokenRefreshRequestDto } from './dto/token-refresh-request.dto';
import { TokenRefreshResponseDto } from './dto/token-refresh-response.dto';

export const ApiDocs: SwaggerMethodDoc<AuthController> = {
  kakaoLogin(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '카카오 로그인 API',
      }),
      ApiBody({
        type: LoginRequestDto,
      }),
      ApiResponse({
        status: 201,
        description:
          'access token + refresh token + user 정보 + userOnboarding 정보',
        type: LoginResponseDto,
      }),
      ApiBearerAuth('Authorization'),
    );
  },
  appleLogin(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '애플 로그인 API',
      }),
      ApiBody({
        type: LoginRequestDto,
      }),
      ApiResponse({
        status: 201,
        description:
          'access token + refresh token + user 정보 + userOnboarding 정보',
        type: LoginResponseDto,
      }),
      ApiBearerAuth('Authorization'),
    );
  },
  logout(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '로그아웃을 수행하여 리프레시 토큰 저장소에서 삭제',
      }),
      ApiResponse({
        status: 200,
        description: '빈 data 객체 + Success Message',
        type: DataEmptyResponse,
      }),
      ApiBearerAuth('Authorization'),
    );
  },
  refreshToken(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description:
          '리프레시 토큰의 검증을 수행하고 유효하다면 엑세스 토큰을 재발급',
      }),
      ApiBody({
        type: TokenRefreshRequestDto,
      }),
      ApiResponse({
        status: 201,
        description: 'new access token',
        type: TokenRefreshResponseDto,
      }),
      ApiBearerAuth('Authorization'),
    );
  },
  removeUser(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '회원 탈퇴 API',
      }),
      ApiResponse({
        status: 200,
        description: '빈 data 객체 + Success Message',
        type: DataEmptyResponse,
      }),
      ApiBearerAuth('Authorization'),
    );
  },
};
