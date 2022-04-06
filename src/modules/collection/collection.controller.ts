import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiDocs } from './collection.docs';
import { CollectionService } from './collection.service';
import { AddNamecardToCollectionsDto } from './dto/add-namecard-to-collections.dto';
import { AddAndRemoveNamecardsDto } from './dto/add-and-remove-namecards.dto';
import { UpsertCollectionDto } from './dto/upsert-collection.dto';
import { AuthUser } from 'src/common/decorators/auth.decorator';
import { User } from 'src/entities/user.entity';

@ApiTags('Collection - 도감')
@Controller('collections')
@UseGuards(JwtAuthGuard)
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  @ApiDocs.getCollections('도감들 조회')
  async getCollections(@AuthUser() user: User) {
    return await this.collectionService.getCollections(user.id);
  }

  @Get('/namecards')
  @ApiDocs.getAllNamecards('전체 명함 조회')
  async getAllNamecards(@AuthUser() user: User) {
    return await this.collectionService.getAllNamecards(user.id);
  }

  @Get('/:collectionId')
  @ApiDocs.getCollectionById('특정 도감 조회')
  async getCollectionById(
    @AuthUser() user: User,
    @Param('collectionId') collectionId: number,
  ) {
    return await this.collectionService.getCollectionById(
      user.id,
      collectionId,
    );
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
    @AuthUser() user: User,
    @Body() updateCollectionDto: UpsertCollectionDto,
  ) {
    return await this.collectionService.createCollection(
      user.id,
      updateCollectionDto,
    );
  }

  @Delete('/:collectionId')
  @ApiDocs.deleteCollection('도감 삭제')
  async deleteCollection(@Param('collectionId') collectionId: number) {
    await this.collectionService.deleteCollection(collectionId);
  }

  @Post('/namecards/:namecardUniqueCode')
  @ApiDocs.addNamecardToCollections('도감들에 명함 추가')
  async addNamecardToCollections(
    @AuthUser() user: User,
    @Body() addNameCardToCollectionsData: AddNamecardToCollectionsDto,
    @Param('namecardUniqueCode') namecardUniqueCode: string,
  ) {
    return await this.collectionService.addNamecardToCollections(
      user.id,
      addNameCardToCollectionsData,
      namecardUniqueCode,
    );
  }

  @Post('/:collectionId/namecards')
  @ApiDocs.addNamecardsToCollection('도감에 명함들 추가')
  async addNamecardsToCollection(
    @AuthUser() user: User,
    @Param('collectionId') collectionId: number,
    @Body() addNamecardsToCollectionData: AddAndRemoveNamecardsDto,
  ) {
    return await this.collectionService.addNamecardsToCollection(
      user.id,
      collectionId,
      addNamecardsToCollectionData,
    );
  }

  @Get('/:collectionId/namecards')
  @ApiDocs.getNamecardsFromCollection('도감의 명함들 조회')
  async getNamecardsFromCollection(
    @AuthUser() user: User,
    @Param('collectionId') collectionId: number,
  ) {
    return await this.collectionService.getNamecardsFromCollection(
      user.id,
      collectionId,
    );
  }

  @Delete('/all/namecards')
  @ApiDocs.deleteNamecardFromAllCollection('전체 도감에서 명함들 제거')
  async deleteNamecardFromAllCollection(
    @AuthUser() user: User,
    @Body() removeNamecardsFromCollectionDto: AddAndRemoveNamecardsDto,
  ) {
    await this.collectionService.deleteNamecardFromAllCollection(
      user.id,
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
