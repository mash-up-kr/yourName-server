import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '../../swagger/swagger-method-doc-type';
import { GetTmisResponseDto } from './dto/get-tmis-response.dto';
import { TmisController } from './tmis.controller';

export const ApiDocs: SwaggerMethodDoc<TmisController> = {
  getBehaviorTmis(summary) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '취미/관심사에 해당하는 tmi 정보들을 조회합니다',
      }),
      ApiResponse({
        status: 200,
        description: '취미/관심사에 해당하는 tmi 정보들',
        type: GetTmisResponseDto,
      }),
    );
  },
  getCharacterTmis(summary) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '성격에 해당하는 tmi 정보들을 조회합니다.',
      }),
      ApiResponse({
        status: 200,
        description: '성격에 해당하는 tmi 정보들',
        type: GetTmisResponseDto,
      }),
    );
  },
};
