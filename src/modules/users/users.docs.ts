import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '../../swagger/swagger-method-doc-type';
import { UsersController } from './users.controller';

export const ApiDocs: SwaggerMethodDoc<UsersController> = {
  getOnboarding(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiParam({
        name: 'id',
        required: true,
        description: '유저 id',
      }),
    );
  },
  doneOnboarding(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiParam({
        name: 'id',
        required: true,
        description: '유저 id',
      }),
      ApiParam({
        name: 'type',
        required: true,
        description: '온보딩 퀘스트 타입',
      }),
    );
  },
};
