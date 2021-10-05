import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tmi } from 'src/entities/tmi.entity';
import { TmisController } from './tmis.controller';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

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
