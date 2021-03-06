import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { DataEmptyResponse } from 'src/common/dto/data-empty-response.dto';
import { SwaggerMethodDoc } from '../../swagger/swagger-method-doc-type';
import { CollectionController } from './collection.controller';
import { AddAndRemoveNamecardsDto } from './dto/add-and-remove-namecards.dto';
import { AddNamecardResponseDto } from './dto/add-namecard-response.dto';
import { AddNamecardToCollectionsDto } from './dto/add-namecard-to-collections.dto';
import { CreateCollectionResponseDto } from './dto/create-collection-response.dto';
import { GetCollectionResponseDto } from './dto/get-collections-response.dto';
import { GetManyNamecardsResponseDto } from './dto/get-many-namecards-response.dto';
import { UpsertCollectionDto } from './dto/upsert-collection.dto';

export const ApiDocs: SwaggerMethodDoc<CollectionController> = {
  getCollections(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '유저가 보유한 모든 도감들을 조회',
      }),
      ApiResponse({
        description: '유저의 도감들',
        status: 200,
        type: GetCollectionResponseDto,
      }),
      ApiBearerAuth('Authorization'),
    );
  },

  getCollectionById(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '특정 id를 가진 도감 조회',
      }),
      ApiResponse({
        description: '특정 id를 가진 도감에 대한 정보',
        status: 200,
        type: GetCollectionResponseDto,
      }),
      ApiBearerAuth('Authorization'),
    );
  },

  getAllNamecards(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '해당 ID를 가진 유저의 전체 도감에 있는 명함들 조회',
      }),
      ApiResponse({
        description: '유저가 추가한 전체 명함들',
        status: 200,
        type: GetManyNamecardsResponseDto,
      }),
      ApiBearerAuth('Authorization'),
    );
  },

  getNamecardsFromCollection(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '해당 ID를 가진 도감에 있는 모든 명함들 조회',
      }),
      ApiParam({
        name: 'collectionId',
        required: true,
        description: 'Collection ID',
      }),
      ApiResponse({
        description: '도감에 있는 명함들',
        status: 200,
        type: GetManyNamecardsResponseDto,
      }),
      ApiBearerAuth('Authorization'),
    );
  },

  createCollection(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description:
          '유저가 지정한 이름과 해당 도감에 대한 한줄 설명, 배경색과 함께 도감을 생성',
      }),
      ApiBody({
        type: UpsertCollectionDto,
      }),
      ApiResponse({
        status: 201,
        description: '생성한 도감의 ID',
        type: CreateCollectionResponseDto,
      }),
      ApiBearerAuth('Authorization'),
    );
  },

  addNamecardsToCollection(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '해당 ID를 가진 도감에 해당 ID를 가진 명함들을 추가',
      }),
      ApiBody({
        type: AddAndRemoveNamecardsDto,
      }),
      ApiResponse({
        status: 201,
        description: '도감-명함 관계 테이블에 추가된 ID들',
        type: AddNamecardResponseDto,
      }),
      ApiBearerAuth('Authorization'),
    );
  },

  addNamecardToCollections(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description:
          '해당 ID를 가진 도감들에 해당 고유 코드를 가진 명함을 추가',
      }),
      ApiParam({
        name: 'namecardUniqueCode',
        required: true,
        description: '명함의 고유 코드',
      }),
      ApiBody({
        type: AddNamecardToCollectionsDto,
      }),
      ApiResponse({
        status: 201,
        description: '도감-명함 관계 테이블에 추가된 ID들',
        type: AddNamecardResponseDto,
      }),
      ApiBearerAuth('Authorization'),
    );
  },

  updateCollection(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '유저의 특정 도감의 정보(이름, 설명, 색깔)를 수정',
      }),
      ApiParam({
        name: 'collectionId',
        required: true,
        description: '도감 ID',
      }),
      ApiBody({
        type: UpsertCollectionDto,
      }),
      ApiResponse({
        status: 200,
        description: '빈 data 객체 + Success Message',
        type: DataEmptyResponse,
      }),
      ApiBearerAuth('Authorization'),
    );
  },

  deleteCollection(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '해당 ID를 가진 도감을 삭제',
      }),
      ApiParam({
        name: 'collectionId',
        required: true,
        description: '도감 ID',
      }),
      ApiResponse({
        status: 200,
        description: '빈 data 객체 + Success Message',
        type: DataEmptyResponse,
      }),
      ApiBearerAuth('Authorization'),
    );
  },

  deleteNamecardFromAllCollection(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '전체 도감에서 선택된 명함들을 제거',
      }),
      ApiBody({
        type: AddAndRemoveNamecardsDto,
      }),
      ApiResponse({
        status: 200,
        description: '빈 data 객체 + Success Message',
        type: DataEmptyResponse,
      }),
      ApiBearerAuth('Authorization'),
    );
  },

  deleteNamecardFromCollection(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '유저의 특정 도감에 있는 선택된 명함들을 제거',
      }),
      ApiParam({
        name: 'collectionId',
        required: true,
        description: 'Collection ID',
      }),
      ApiBody({
        type: AddAndRemoveNamecardsDto,
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
