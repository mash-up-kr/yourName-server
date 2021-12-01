import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiDocs } from './tmis.docs';
import { TmisService } from './tmis.service';

@ApiTags('Tmi')
@Controller('tmis')
export class TmisController {
  constructor(private tmisService: TmisService) {}

  @ApiDocs.getBehaviorTmis('취미/관심사 tmis 조회')
  @Get('behavior')
  async getBehaviorTmis() {
    return await this.tmisService.findBehaviorTmis();
  }

  @ApiDocs.getCharacterTmis('성격 tmis 조회')
  @Get('character')
  async getCharacterTmis() {
    return await this.tmisService.findCharacterTmis();
  }
}
