import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { DataEmptyResponse } from 'src/common/dto/data-empty-response.dto';
import { SwaggerMethodDoc } from '../../swagger/swagger-method-doc-type';
import { GetBgcolorResponseDto } from './dto/get-bgcolor-response.dto';
import { GetUserOnboardingsResponseDto } from './dto/get-user-onboardings-response.dto';
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
      ApiResponse({
        status: 200,
        description: '온보딩 목록 및 달성 여부 목록',
        type: GetUserOnboardingsResponseDto,
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
      ApiResponse({
        status: 200,
        description: '빈 data 객체 + Success Message',
        type: DataEmptyResponse,
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
      ApiResponse({
        status: 200,
        description: '빈 data 객체 + Success Message',
        type: DataEmptyResponse,
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
      ApiResponse({
        status: 200,
        description: '유저가 사용한 컬러 목록',
        type: GetBgcolorResponseDto,
      }),
    );
  },
};
