import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Req,
  Put,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateNameCardDto } from './dto/create-name-card.dto';
import { UpdateNameCardDto } from './dto/update-name-card.dto';
import { ApiDocs } from './name-card.docs';
import { NameCardService } from './name-card.service';

@ApiTags('NameCard - 명함')
@Controller('namecards')
export class NameCardController {
  constructor(private readonly nameCardService: NameCardService) {}

  @Post()
  @ApiDocs.createNameCard('내 명함 생성')
  async createNameCard(@Body() createNameCardDto: CreateNameCardDto) {
    const nameCard = await this.nameCardService.createNameCard(
      createNameCardDto,
    );
    return { nameCardId: nameCard.id };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiDocs.getMyNameCards('내 명함 가져오기')
  async getMyNameCards(@Req() req: any) {
    return await this.nameCardService.getMyNameCards(req.user.userId);
  }

  //@todo: guard 적용 후 본인 명함에 대한 작업인지 체크
  @Put(':id')
  @ApiDocs.updateNameCard('내 명함 수정')
  async updateNameCard(
    @Param('id') nameCardId: number,
    @Body() updateNameCardDto: UpdateNameCardDto,
  ) {
    await this.nameCardService.updateNameCard(nameCardId, updateNameCardDto);
  }

  //@todo: guard 적용 후 본인 명함에 대한 작업인지 체크
  @Delete(':id')
  @ApiDocs.deleteNameCard('내 명함 삭제')
  async deleteNameCard(@Param('id') nameCardId: number) {
    await this.nameCardService.deleteNameCard(nameCardId);
  }
}
