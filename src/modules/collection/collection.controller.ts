import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiDocs } from './collection.docs';
import { CollectionService } from './collection.service';

@ApiTags('Collection - 도감')
@Controller('collections')
@UseGuards(JwtAuthGuard)
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  @ApiDocs.getCollection('도감 조회')
  async getCollection(@Req() req: any) {
    return await this.collectionService.getCollection(req.user.userId);
  }

  @Get('/namecards/:namecardUniqueCode')
  @ApiDocs.getNamecardByUniqueCode('특정 명함 조회')
  async getNamecardByUniqueCode(
    @Param('namecardUniqueCode') uniqueCode: string,
  ) {
    return await this.collectionService.getNamecardByUniqueCode(uniqueCode);
  }

  @Post('/namecards/:namecardUniqueCode')
  @ApiDocs.addNamecardToCollection('도감에 명함 추가')
  async addNamecardToCollection(
    @Req() req: any,
    @Param('namecardUniqueCode') namecardUniqueCode: string,
  ) {
    return this.collectionService.addNamecardToCollection(
      req.user.userId,
      namecardUniqueCode,
    );
  }

  @Delete('/namecards/:namecardUniqueCode')
  @ApiDocs.deleteNamecardFromCollection('도감에서 명함 제거')
  async deleteNamecardFromCollection(
    @Req() req: any,
    @Param('namecardUniqueCode')
    namecardUniqueCode: string,
  ) {
    await this.collectionService.deleteNamecardFromCollection(
      req.user.userId,
      namecardUniqueCode,
    );
  }
}
