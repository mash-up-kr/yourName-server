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
import { CreateNameCardResponseDto } from './dto/create-name-card-response.dto';
import { CreateNameCardDto } from './dto/create-name-card.dto';
import { GetManyNamecardsResponseDto } from './dto/get-many-namecards-response.dto';
import { GetOneNameCardResponseDto } from './dto/get-one-namecard-response.dto';
import { NameCardController } from './name-cards.controller';

export const ApiDocs: SwaggerMethodDoc<NameCardController> = {
  createNameCard(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiBody({
        type: CreateNameCardDto,
      }),
      ApiResponse({
        status: 201,
        description: '생성된 명함 id',
        type: CreateNameCardResponseDto,
      }),
      ApiBearerAuth('Authorization'),
    );
  },

  getMyNameCards(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiResponse({
        status: 200,
        description: '유저의 명함들',
        type: GetManyNamecardsResponseDto,
      }),
      ApiBearerAuth('Authorization'),
    );
  },

  getNamecardByUniqueCode(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiResponse({
        status: 200,
        description: '명함 단건 조회',
        type: GetOneNameCardResponseDto,
      }),
      ApiBearerAuth('Authorization'),
    );
  },

  updateNameCard(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiParam({
        name: 'namecardUniqueCode',
        description: '수정을 원하는 명함에 고유 코드',
        required: true,
      }),
      ApiResponse({
        status: 200,
        description: '빈 data 객체 + Success Message',
        type: DataEmptyResponse,
      }),
      ApiBearerAuth('Authorization'),
    );
  },

  deleteNameCard(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiParam({
        name: 'namecardUniqueCode',
        description: '삭제를 원하는 명함에 고유 코드',
        required: true,
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
