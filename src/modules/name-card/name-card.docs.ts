import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { NameCardController } from './name-card.controller';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

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
