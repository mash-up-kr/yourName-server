import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '../../swagger/swagger-method-doc-type';
import { CollectionController } from './collection.controller';

export const ApiDocs: SwaggerMethodDoc<CollectionController> = {
  getCollection(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '도감의 고유 번호로 해당 도감을 조회',
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

  addNamecardToCollection(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '특정 도감에 특정 명함을 추가',
      }),
      ApiParam({
        name: 'namecardUniqueCode',
        required: true,
        description: '명함의 고유 코드',
      }),
    );
  },

  deleteNamecardFromCollection(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '특정 도감에서 특정 명함을 제거',
      }),
      ApiParam({
        name: 'namecardUniqueCode',
        required: true,
        description: '명함의 고유 코드',
      }),
    );
  },
};
