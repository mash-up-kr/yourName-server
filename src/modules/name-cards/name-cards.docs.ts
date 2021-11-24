import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
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
      ApiQuery({
        name: 'userId',
        required: true,
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
    );
  },
  deleteNameCard(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
    );
  },
};
