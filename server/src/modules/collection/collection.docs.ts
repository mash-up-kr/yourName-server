import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '../../swagger/swagger-method-doc-type';
import { CollectionController } from './collection.controller';

export const ApiDocs: SwaggerMethodDoc<CollectionController> = {
  getCollections(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '유저가 보유한 모든 도감들을 조회',
      }),
    );
  },

  getNamecardByUniqueCode(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '명함당 부여되는 고유 코드로 도감에 추가할 명함을 조회',
      }),
      ApiParam({
        name: 'namecardUniqueCode',
        required: true,
        description: '명함의 고유 코드',
      }),
    );
  },

  getAllNamecards(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '해당 ID를 가진 유저의 전체 도감에 있는 명함들 조회',
      }),
      ApiParam({
        name: 'userId',
        required: true,
        description: 'User ID',
      }),
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
    );
  },

  createCollection(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description:
          '유저가 지정한 이름과 해당 도감에 대한 한줄 설명과 함께 도감을 생성',
      }),
      ApiParam({
        name: 'name',
        required: true,
        description: '새로 생성한 도감의 이름',
      }),
      ApiParam({
        name: 'description',
        required: true,
        description: '새로 생성한 도감에 대한 설명',
      }),
    );
  },

  addNamecardsToCollection(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '해당 ID를 가진 명함에 해당 ID를 가진 명함들을 추가',
      }),
      ApiParam({
        name: 'collectionId',
        required: true,
        description: '도감 ID',
      }),
      ApiParam({
        name: 'addNamecardsToCollectionData',
        required: true,
        description: 'Namecard ID들이 담긴 DTO',
      }),
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
      ApiParam({
        name: 'addNameCardToCollectionsData',
        required: true,
        description: 'Collection ID들이 담긴 DTO',
      }),
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
    );
  },

  deleteNamecardFromAllCollection(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '전체 도감에서 선택된 명함들을 제거',
      }),
      ApiParam({
        name: 'namecardIds',
        required: true,
        description: '명함 ID들',
      }),
      ApiParam({
        name: 'userId',
        required: true,
        description: '유저 ID',
      }),
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
      ApiParam({
        name: 'namecardIds',
        required: true,
        description: '명함 ID들',
      }),
    );
  },
};
