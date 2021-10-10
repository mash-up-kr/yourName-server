import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '../../swagger/swagger-method-doc-type';
import { NameCardController } from './name-card.controller';

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
};
