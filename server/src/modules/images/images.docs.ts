import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';
import { SwaggerMethodDoc } from 'src/swagger/swagger-method-doc-type';
import { ImageController } from '../images/images.controller';

export const ApiDocs: SwaggerMethodDoc<ImageController> = {
  uploadFile(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '이미지를 업로드합니다',
      }),
      ApiConsumes('multipart/form-data'),
      ApiBearerAuth(),
      ApiBody({
        schema: {
          type: 'object',
          properties: {
            image: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      }),
    );
  },
};
