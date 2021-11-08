import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Collection } from 'src/entities/collection.entity';
import { NameCard } from 'src/entities/name-card.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiDocs } from './collection.docs';
import { CollectionService } from './collection.service';
import { AddNamecardToCollectionsDto } from './dto/add-namecard-to-collections.dto';
import { AddAndRemoveNamecardsDto } from './dto/add-and-remove-namecards.dto';
import { CreateCollectionDto } from './dto/create-collection.dto';

@ApiTags('Collection - 도감')
@Controller('collections')
@UseGuards(JwtAuthGuard)
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  @ApiDocs.getCollections('도감들 조회')
  async getCollections(@Param('id') id: number, @Req() req: any) {
    const collections: Collection[] =
      await this.collectionService.getCollections(req.user.userId);
    return { list: collections };
  }

  @Put('/:collectionId')
  @ApiDocs.updateCollection('도감 정보 수정')
  async updateCollection(
    @Param('collectionId') collectionId: number,
    @Body() createCollectionDto: CreateCollectionDto,
  ) {
    await this.collectionService.updateCollection(
      collectionId,
      createCollectionDto,
    );
  }

  @Post()
  @ApiDocs.createCollection('도감 생성')
  async createCollection(
    @Req() req: any,
    @Body() createCollectionDto: CreateCollectionDto,
  ) {
    await this.collectionService.createCollection(
      req.user.userId,
      createCollectionDto,
    );
  }

  @Delete('/:collectionId')
  @ApiDocs.deleteCollection('도감 삭제')
  async deleteCollection(@Param('collectionId') collectionId: number) {
    await this.collectionService.deleteCollection(collectionId);
  }

  @Get('/namecards/:namecardUniqueCode')
  @ApiDocs.getNamecardByUniqueCode('특정 명함 조회')
  async getNamecardByUniqueCode(
    @Param('namecardUniqueCode') uniqueCode: string,
    @Req() req: any,
  ) {
    const namecard: NameCard =
      await this.collectionService.getNamecardByUniqueCode(uniqueCode);
    const isAdded: boolean = await this.collectionService.isAddedNameCard(
      req.user.userId,
      namecard,
    );
    return { namecard, isAdded: isAdded };
  }

  @Post('/namecards/:namecardUniqueCode')
  @ApiDocs.addNamecardToCollections('도감들에 명함 추가')
  async addNamecardToCollections(
    @Req() req: any,
    @Body() addNameCardToCollectionsData: AddNamecardToCollectionsDto,
    @Param('namecardUniqueCode') namecardUniqueCode: string,
  ) {
    await this.collectionService.addNamecardToCollections(
      req.user.userId,
      addNameCardToCollectionsData,
      namecardUniqueCode,
    );
  }

  @Post('/:collectionId/namecards')
  @ApiDocs.addNamecardsToCollection('도감에 명함들 추가')
  async addNamecardsToCollection(
    @Req() req: any,
    @Param('collectionId') collectionId: number,
    @Body() addNamecardsToCollectionData: AddAndRemoveNamecardsDto,
  ) {
    await this.collectionService.addNamecardsToCollection(
      req.user.userId,
      collectionId,
      addNamecardsToCollectionData,
    );
  }

  @Get('/namecards')
  @ApiDocs.getAllNamecards('전체 명함 조회')
  async getAllNamecards(@Req() req: any) {
    const namecards: NameCard[] = await this.collectionService.getAllNamecards(
      req.user.userId,
    );
    return { list: namecards };
  }

  @Get('/:collectionId/namecards')
  @ApiDocs.getNamecardsFromCollection('도감의 명함들 조회')
  async getNamecardsFromCollection(
    @Param('collectionId') collectionId: number,
  ) {
    const namecards: NameCard[] =
      await this.collectionService.getNamecardsFromCollection(collectionId);
    return { list: namecards };
  }

  @Delete('/namecards')
  @ApiDocs.deleteNamecardFromAllCollection('전체 도감에서 명함들 제거')
  async deleteNamecardFromAllCollection(
    @Req() req: any,
    @Body() removeNamecardsFromCollectionDto: AddAndRemoveNamecardsDto,
  ) {
    await this.collectionService.deleteNamecardFromAllCollection(
      req.user.userId,
      removeNamecardsFromCollectionDto,
    );
  }

  @Delete('/:collectionId/namecards')
  @ApiDocs.deleteNamecardFromCollection('도감에서 명함들 제거')
  async deleteNamecardFromCollection(
    @Param('collectionId') collectionId: number,
    @Body() removeNamecardsFromCollectionDto: AddAndRemoveNamecardsDto,
  ) {
    await this.collectionService.deleteNamecardFromCollection(
      collectionId,
      removeNamecardsFromCollectionDto,
    );
  }
}
