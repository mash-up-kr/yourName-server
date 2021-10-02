import { Controller, Get } from '@nestjs/common';
import { TmisService } from './tmis.service';

@Controller('tmis')
export class TmisController {
  constructor(private tmisService: TmisService) {}

  @Get('behavior')
  async getBehaviorTmis() {
    return this.tmisService.findBehaviorTmis();
  }

  @Get('character')
  async getCharacterTmis() {
    return this.tmisService.findCharacterTmis();
  }
}
