import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '../../swagger/swagger-method-doc-type';
import { AuthController } from './auth.controller';

export const ApiDocs: SwaggerMethodDoc<AuthController> = {
  kakaoLogin(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '카카오 로그인 API',
      }),
      ApiParam({
        name: 'req',
        required: true,
        description: '카카오 로그인 Request Body',
      }),
    );
  },
  appleLogin(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '애플 로그인 API',
      }),
      ApiParam({
        name: 'req',
        required: true,
        description: '애플 로그인 Request Body',
      }),
    );
  },
  logout(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '로그아웃을 수행하여 리프레시 토큰 저장소에서 삭제',
      }),
      ApiParam({
        name: 'req',
        required: true,
        description: '로그아웃 Request Body에서 사용자 정보 가져옴',
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
      ApiParam({
        name: 'req',
        required: true,
        description: '토큰 리프레시 Request Body에서 사용자 정보를 가져옴',
      }),
    );
  },
};
