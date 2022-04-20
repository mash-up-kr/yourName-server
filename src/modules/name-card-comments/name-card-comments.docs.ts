import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '../../swagger/swagger-method-doc-type';
import { CreateNameCardCommentDto } from './dto/create-name-card-comment.dto';
import { DeleteNameCardCommentDto } from './dto/delete-name-card-comment.dto';
import { FixNameCardCommentDto } from './dto/fix-name-card-comment.dto';
import { PrivatizeNameCardCommentDto } from './dto/privatize-name-card-comment.dto';
import { NameCardCommentsController } from './name-card-comments.controller';

export const ApiDocs: SwaggerMethodDoc<NameCardCommentsController> = {
  getNameCardComments(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiBearerAuth('Authorization'),
    );
  },

  createNameCardComment(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiBody({
        type: CreateNameCardCommentDto,
      }),
      ApiBearerAuth('Authorization'),
    );
  },

  deleteNameCardComment(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiBody({
        type: DeleteNameCardCommentDto,
      }),
      ApiBearerAuth('Authorization'),
    );
  },

  fixNameCardComment(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiBody({
        type: FixNameCardCommentDto,
      }),
      ApiBearerAuth('Authorization'),
    );
  },

  privatizeNameCardComment(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiBody({
        type: PrivatizeNameCardCommentDto,
      }),
      ApiBearerAuth('Authorization'),
    );
  },
};
