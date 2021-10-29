import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
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
  async getCollections(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const collections: Collection[] =
      await this.collectionService.getCollections(req.user.userId);
    res.status(200).json({
      status: 200,
      data: { list: collections },
      message: 'Success To Get Collections',
    });
  }

  @Put('/:collectionId')
  @ApiDocs.updateCollection('도감 정보 수정')
  async updateCollection(
    @Param('collectionId') collectionId: number,
    @Body() createCollectionDto: CreateCollectionDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.collectionService.updateCollection(
      collectionId,
      createCollectionDto,
    );
    res.status(200).json({
      status: 200,
      data: {},
      message: 'Success To Update Collection',
    });
  }

  @Post()
  @ApiDocs.createCollection('도감 생성')
  async createCollection(
    @Req() req: any,
    @Body() createCollectionDto: CreateCollectionDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.collectionService.createCollection(
      req.user.userId,
      createCollectionDto,
    );
    res.status(201).json({
      status: 201,
      data: {},
      message: 'Success To Create Collection',
    });
  }

  @Delete('/:collectionId')
  @ApiDocs.deleteCollection('도감 삭제')
  async deleteCollection(
    @Param('collectionId') collectionId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.collectionService.deleteCollection(collectionId);
    res.status(200).json({
      status: 200,
      data: {},
      message: 'Success To Delete Collection',
    });
  }

  @Get('/namecards/:namecardUniqueCode')
  @ApiDocs.getNamecardByUniqueCode('특정 명함 조회')
  async getNamecardByUniqueCode(
    @Param('namecardUniqueCode') uniqueCode: string,
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const namecard: NameCard =
      await this.collectionService.getNamecardByUniqueCode(uniqueCode);
    const isAdded: boolean = await this.collectionService.isAddedNameCard(
      req.user.userId,
      namecard,
    );
    res.status(200).json({
      status: 200,
      data: { namecard, isAdded: isAdded },
      message: 'Success To Get NameCard',
    });
  }

  @Post('/namecards/:namecardUniqueCode')
  @ApiDocs.addNamecardToCollections('도감들에 명함 추가')
  async addNamecardToCollections(
    @Req() req: any,
    @Body() addNameCardToCollectionsData: AddNamecardToCollectionsDto,
    @Param('namecardUniqueCode') namecardUniqueCode: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.collectionService.addNamecardToCollections(
      req.user.userId,
      addNameCardToCollectionsData,
      namecardUniqueCode,
    );
    res.status(201).json({
      status: 201,
      data: {},
      message: 'Success To Add NameCard To Collections',
    });
  }

  @Post('/:collectionId/namecards')
  @ApiDocs.addNamecardsToCollection('도감에 명함들 추가')
  async addNamecardsToCollection(
    @Req() req: any,
    @Param('collectionId') collectionId: number,
    @Body() addNamecardsToCollectionData: AddAndRemoveNamecardsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.collectionService.addNamecardsToCollection(
      req.user.userId,
      collectionId,
      addNamecardsToCollectionData,
    );
    res.status(201).json({
      status: 201,
      data: {},
      message: 'Success To Add NameCards To Collection',
    });
  }

  @Get('/namecards')
  @ApiDocs.getAllNamecards('전체 명함 조회')
  async getAllNamecards(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const namecards: NameCard[] = await this.collectionService.getAllNamecards(
      req.user.userId,
    );
    res.status(200).json({
      status: 200,
      data: { list: namecards },
      message: 'Success To Get NameCards',
    });
  }

  @Get('/:collectionId/namecards')
  @ApiDocs.getNamecardsFromCollection('도감의 명함들 조회')
  async getNamecardsFromCollection(
    @Param('collectionId') collectionId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    const namecards: NameCard[] =
      await this.collectionService.getNamecardsFromCollection(collectionId);
    res.status(200).json({
      status: 200,
      data: { list: namecards },
      message: 'Success To Get NameCards From Collection',
    });
  }

  @Delete('/namecards')
  @ApiDocs.deleteNamecardFromAllCollection('전체 도감에서 명함들 제거')
  async deleteNamecardFromAllCollection(
    @Req() req: any,
    @Body() removeNamecardsFromCollectionDto: AddAndRemoveNamecardsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.collectionService.deleteNamecardFromAllCollection(
      req.user.userId,
      removeNamecardsFromCollectionDto,
    );
    res.status(200).json({
      status: 200,
      data: {},
      message: 'Success To Delete NameCards From All Collection',
    });
  }

  @Delete('/:collectionId/namecards')
  @ApiDocs.deleteNamecardFromCollection('도감에서 명함들 제거')
  async deleteNamecardFromCollection(
    @Param('collectionId') collectionId: number,
    @Body() removeNamecardsFromCollectionDto: AddAndRemoveNamecardsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.collectionService.deleteNamecardFromCollection(
      collectionId,
      removeNamecardsFromCollectionDto,
    );
    res.status(200).json({
      status: 200,
      data: {},
      message: 'Success To Delete NameCards From Collection',
    });
  }
}
