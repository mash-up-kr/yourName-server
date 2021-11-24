import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '../../swagger/swagger-method-doc-type';
import { NameCardController } from './name-cards.controller';

export const ApiDocs: SwaggerMethodDoc<NameCardController> = {
  createNameCard(summary: string) {
    return applyDecorators(ApiOperation({ summary }));
  },

  getMyNameCards(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
    );
  },

  getNamecardByUniqueCode(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiParam({
        name: 'NameCardUniqueCode',
        description: '명함 당 부여되는 고유 코드',
        required: true,
      }),
    );
  },

  updateNameCard(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiParam({
        name: 'namecardId',
        description: '수정을 원하는 명함 id',
        required: true,
      }),
    );
  },

  deleteNameCard(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiParam({
        name: 'namecardId',
        description: '삭제를 원하는 명함 id',
        required: true,
      }),
    );
  },
};
