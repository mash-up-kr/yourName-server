import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateNameCardDto } from './dto/create-name-card.dto';
import { NameCardService } from './name-card.service';

@ApiTags('NameCard - 명함')
@Controller('namecards')
export class NameCardController {
  constructor(private readonly nameCardService: NameCardService) {}

  @ApiOperation({ summary: '내 명함 생성' })
  @Post()
  async createNameCard(@Body() createNameCardDto: CreateNameCardDto) {
    return await this.nameCardService.createNameCard(createNameCardDto);
  }

  // auth guard 붙이면 query.userId 교체
  @ApiOperation({
    summary: '내 명함 가져오기',
  })
  @ApiQuery({
    name: 'userId',
    required: true,
  })
  @Get()
  async getMyNameCards(@Query('userId') userId?: number) {
    return await this.nameCardService.getMyNameCards(userId);
  }
}
