import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SwaggerMethodDoc } from 'src/swagger/swagger-method-doc-type';
import { ImageController } from '../images/images.controller';
import { ImageUploadResponseDto } from './dto/image-upload-response.dto';

export const ApiDocs: SwaggerMethodDoc<ImageController> = {
  uploadFile(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '이미지를 업로드합니다',
      }),
      ApiConsumes('multipart/form-data'),
      ApiBearerAuth('Authorization'),
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
      ApiResponse({
        status: 201,
        description: '저장된 파일이름.확장자',
        type: ImageUploadResponseDto,
      }),
    );
  },
};
