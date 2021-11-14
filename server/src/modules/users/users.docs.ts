import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '../../swagger/swagger-method-doc-type';
import { UsersController } from './users.controller';

export const ApiDocs: SwaggerMethodDoc<UsersController> = {
  getUserOnboardings(summary: string) {
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
  doneUserOnboarding(summary: string) {
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
        description:
          '온보딩 퀘스트 타입 (makeFirstNameCard|shareNameCard|addNameCollectionNameCard|makeCollection|makeNamCards)',
      }),
    );
  },
  doneWaitUserOnboarding(summary: string) {
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
        description:
          '온보딩 퀘스트 타입 (makeFirstNameCard|shareNameCard|addNameCollectionNameCard|makeCollection|makeNamCards)',
      }),
    );
  },
  getBgColors(summary: string) {
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
};
