import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '../../swagger/swagger-method-doc-type';
import { AuthController } from './auth.controller';

export const ApiDocs: SwaggerMethodDoc<AuthController> = {
  kakaoLogin(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '카카오 로그인 API',
      }),
      ApiResponse({
        status: 201,
        description: 'access token + refresh token',
      }),
      ApiHeader({
        name: 'authorization',
        description: '카카오에서 발급받은 access token',
      }),
    );
  },
  appleLogin(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '애플 로그인 API',
      }),
      ApiResponse({
        status: 201,
        description: 'access token + refresh token',
      }),
      ApiHeader({
        name: 'authorization',
        description: '애플에서 발급받은 Idedntity token',
      }),
    );
  },
  logout(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '로그아웃을 수행하여 리프레시 토큰 저장소에서 삭제',
      }),
      ApiResponse({
        status: 201,
        description: '빈 data 객체 + Success Message',
      }),
      ApiHeader({
        name: 'authorization',
        description: '유저의 access token',
      }),
    );
  },
  refreshToken(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description:
          '리프레시 토큰의 검증을 수행하고 유효하다면 엑세스 토큰을 재발급',
      }),
      ApiResponse({
        status: 201,
        description: 'new access token',
      }),
      ApiHeader({
        name: 'authorization',
        description: '유저의 refresh token',
      }),
    );
  },
};
