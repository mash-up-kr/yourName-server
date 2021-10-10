import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '../../swagger/swagger-method-doc-type';
import { TmisController } from './tmis.controller';

export const ApiDocs: SwaggerMethodDoc<TmisController> = {
  getBehaviorTmis(summary) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '취미/관심사에 해당하는 tmi 정보들을 조회합니다',
      }),
    );
  },
  getCharacterTmis(summary) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '성격에 해당하는 tmi 정보들을 조회합니다.',
      }),
    );
  },
};
