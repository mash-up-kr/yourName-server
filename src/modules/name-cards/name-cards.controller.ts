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
import { NameCardSchema } from 'src/interfaces/namecard.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateNameCardDto } from './dto/create-name-card.dto';
import { UpdateNameCardDto } from './dto/update-name-card.dto';
import { ApiDocs } from './name-cards.docs';
import { NameCardService } from './name-cards.service';

@ApiTags('NameCard - 명함')
@UseGuards(JwtAuthGuard)
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

  @Get()
  @ApiDocs.getMyNameCards('내가 생성한 명함 가져오기')
  async getMyNameCards(@Req() req: any) {
    const namecards: NameCardSchema[] =
      await this.nameCardService.getMyNameCards(req.user.userId);
    if (namecards.length == 0) return;
    return { list: namecards };
  }

  @Get('/:namecardUniqueCode')
  @ApiDocs.getNamecardByUniqueCode('특정 명함 조회')
  async getNamecardByUniqueCode(
    @Param('namecardUniqueCode') uniqueCode: string,
    @Req() req: any,
  ) {
    const nameCard: NameCardSchema =
      await this.nameCardService.getNamecardByUniqueCode(uniqueCode);
    if (!nameCard) return;

    const isAdded: boolean = await this.nameCardService.isAddedNameCard(
      req.user.userId,
      nameCard,
    );
    return { nameCard, isAdded: isAdded };
  }

  @Put(':namecardId')
  @ApiDocs.updateNameCard('내 명함 수정')
  async updateNameCard(
    @Param('namecardId') nameCardId: number,
    @Body() updateNameCardDto: UpdateNameCardDto,
  ) {
    await this.nameCardService.updateNameCard(nameCardId, updateNameCardDto);
  }

  @Delete(':namecardId')
  @ApiDocs.deleteNameCard('내 명함 삭제')
  async deleteNameCard(@Param('namecardId') nameCardId: number) {
    await this.nameCardService.deleteNameCard(nameCardId);
  }
}
