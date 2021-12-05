import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/common/decorators/auth.decorator';
import { User } from 'src/entities/user.entity';
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
  async createNameCard(
    @AuthUser() user: User,
    @Body() createNameCardDto: CreateNameCardDto,
  ) {
    return await this.nameCardService.createNameCard(
      user.id,
      createNameCardDto,
    );
  }

  @Get()
  @ApiDocs.getMyNameCards('내가 생성한 명함 가져오기')
  async getMyNameCards(@AuthUser() user: User) {
    return await this.nameCardService.getMyNameCards(user.id);
  }

  @Get('/:namecardUniqueCode')
  @ApiDocs.getNamecardByUniqueCode('특정 명함 조회')
  async getNamecardByUniqueCode(
    @Param('namecardUniqueCode') uniqueCode: string,
    @AuthUser() user: User,
  ) {
    return await this.nameCardService.getNamecardByUniqueCode(
      user.id,
      uniqueCode,
    );
  }

  @Put(':namecardUniqueCode')
  @ApiDocs.updateNameCard('내 명함 수정')
  async updateNameCard(
    @Param('namecardUniqueCode') namecardUniqueCode: string,
    @Body() updateNameCardDto: UpdateNameCardDto,
  ) {
    await this.nameCardService.updateNameCard(
      namecardUniqueCode,
      updateNameCardDto,
    );
  }

  @Delete(':namecardUniqueCode')
  @ApiDocs.deleteNameCard('내 명함 삭제')
  async deleteNameCard(
    @Param('namecardUniqueCode') namecardUniqueCode: string,
  ) {
    await this.nameCardService.deleteNameCard(namecardUniqueCode);
  }
}
