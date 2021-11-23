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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiDocs } from './collection.docs';
import { CollectionService } from './collection.service';
import { AddNamecardToCollectionsDto } from './dto/add-namecard-to-collections.dto';
import { AddAndRemoveNamecardsDto } from './dto/add-and-remove-namecards.dto';
import { UpsertCollectionDto } from './dto/upsert-collection.dto';
import {
  CollectionSchema,
  NameCardSchema,
} from 'src/interfaces/collection.interface';

@ApiTags('Collection - 도감')
@Controller('collections')
@UseGuards(JwtAuthGuard)
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  @ApiDocs.getCollections('도감들 조회')
  async getCollections(@Param('id') id: number, @Req() req: any) {
    const collections: CollectionSchema[] =
      await this.collectionService.getCollections(req.user.userId);
    if (collections.length == 0) return;
    return { list: collections };
  }

  @Put('/:collectionId')
  @ApiDocs.updateCollection('도감 정보 수정')
  async updateCollection(
    @Param('collectionId') collectionId: number,
    @Body() createCollectionDto: UpsertCollectionDto,
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
    @Body() updateCollectionDto: UpsertCollectionDto,
  ) {
    const collection: Collection =
      await this.collectionService.createCollection(
        req.user.userId,
        updateCollectionDto,
      );

    return collection.id;
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
    const namecard: NameCardSchema =
      await this.collectionService.getNamecardByUniqueCode(uniqueCode);
    if (!namecard) return;

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
    const collectionNamecardIds: number[] =
      await this.collectionService.addNamecardToCollections(
        req.user.userId,
        addNameCardToCollectionsData,
        namecardUniqueCode,
      );

    return { list: collectionNamecardIds };
  }

  @Post('/:collectionId/namecards')
  @ApiDocs.addNamecardsToCollection('도감에 명함들 추가')
  async addNamecardsToCollection(
    @Req() req: any,
    @Param('collectionId') collectionId: number,
    @Body() addNamecardsToCollectionData: AddAndRemoveNamecardsDto,
  ) {
    const collectionNamecardIds: number[] =
      await this.collectionService.addNamecardsToCollection(
        req.user.userId,
        collectionId,
        addNamecardsToCollectionData,
      );

    return { list: collectionNamecardIds };
  }

  @Get('/namecards')
  @ApiDocs.getAllNamecards('전체 명함 조회')
  async getAllNamecards(@Req() req: any) {
    const namecards: NameCardSchema[] =
      await this.collectionService.getAllNamecards(req.user.userId);
    if (namecards.length == 0) return;
    return { list: namecards };
  }

  @Get('/:collectionId/namecards')
  @ApiDocs.getNamecardsFromCollection('도감의 명함들 조회')
  async getNamecardsFromCollection(
    @Param('collectionId') collectionId: number,
  ) {
    const namecards: NameCardSchema[] =
      await this.collectionService.getNamecardsFromCollection(collectionId);
    if (namecards.length == 0) return;
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
