import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionNameCard } from 'src/entities/collection-name-card.entity';
import { Collection } from 'src/entities/collection.entity';
import { NameCard } from 'src/entities/name-card.entity';
import { User } from 'src/entities/user.entity';
import { getConnection, Repository } from 'typeorm';
import { AddNamecardToCollectionsDto } from './dto/add-namecard-to-collections.dto';
import { AddAndRemoveNamecardsDto } from './dto/add-and-remove-namecards.dto';
import { UpsertCollectionDto } from './dto/upsert-collection.dto';
import { BgColor } from 'src/entities/bg-color.entity';
import {
  BgColorSchema,
  ParticularNameCardSchema,
} from 'src/interfaces/namecard.interface';
import { CollectionSchema } from 'src/interfaces/collection.interface';
import { NameCardService } from '../name-cards/name-cards.service';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,

    @InjectRepository(CollectionNameCard)
    private readonly collectionNameCardRepository: Repository<CollectionNameCard>,

    @InjectRepository(NameCard)
    private readonly namecardRepository: Repository<NameCard>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(BgColor)
    private readonly bgColorRepository: Repository<BgColor>,

    private readonly namecardService: NameCardService,
  ) {}

  async getCollectionById(
    userId: number,
    collectionId: number,
  ): Promise<CollectionSchema> {
    try {
      const collection: Collection = await this.collectionRepository.findOne({
        where: { id: collectionId },
        relations: ['bgColor'],
      });

      const formattedCollection: CollectionSchema =
        await this._formattingCollectionRes(userId, collection);

      return formattedCollection;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async _formattingCollectionRes(
    userId: number,
    collection: Collection,
  ): Promise<CollectionSchema> {
    const namecards: ParticularNameCardSchema[] =
      await this.getNamecardsFromCollection(userId, collection.id);

    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      bgColor: this._formattingCollectionBgColor(collection),
      numberOfNameCards: namecards.length,
    };
  }

  async getCollections(userId: number): Promise<CollectionSchema[]> {
    try {
      const collections: Collection[] = await this.collectionRepository.find({
        where: { userId: userId },
        relations: ['bgColor'],
      });

      const collectionOfAllNamecards: CollectionSchema =
        await this._getCollectionOfAllNamecards(userId);
      const formattedCollections: CollectionSchema[] = await Promise.all(
        collections.map(async (collection) => {
          return await this._formattingCollectionRes(userId, collection);
        }),
      );
      formattedCollections.push(collectionOfAllNamecards);

      return formattedCollections;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async _getCollectionOfAllNamecards(
    userId: number,
  ): Promise<CollectionSchema> {
    const namecards: ParticularNameCardSchema[] = await this.getAllNamecards(
      userId,
    );

    return {
      id: null,
      name: '?????? ??????',
      description: null,
      bgColor: null,
      numberOfNameCards: namecards.length,
    };
  }

  _formattingCollectionBgColor(collection: Collection): BgColorSchema {
    const value = [
      ...Object.keys(collection.bgColor)
        .filter((key) => key.includes('color'))
        .map((color) => collection.bgColor[color]),
    ].filter((value) => value);

    return { id: collection.bgColorId, value: value };
  }

  async isDuplicatedName(
    userId: number,
    collectionName: string,
  ): Promise<boolean> {
    return (await this.collectionRepository.findOne({
      where: { userId: userId, name: collectionName },
    }))
      ? true
      : false;
  }

  async createCollection(
    userId: number,
    collectionData: UpsertCollectionDto,
  ): Promise<number> {
    try {
      if (await this.isDuplicatedName(userId, collectionData.name)) {
        throw new BadRequestException({
          message: 'Duplicated Name',
        });
      }

      const user: User = await this.userRepository.findOne({
        where: { id: userId },
      });
      const bgColor: BgColor = await this.bgColorRepository.findOne({
        where: { id: collectionData.bgColorId },
      });

      const collection: Collection = this.collectionRepository.create({
        user: user,
        name: collectionData.name,
        description: collectionData.description,
        bgColor: bgColor,
      });

      const savedCollection: Collection = await this.collectionRepository.save(
        collection,
      );

      return savedCollection.id;
    } catch (err) {
      if (err.status) {
        throw new HttpException(
          { statusCode: err.status, message: err.message },
          err.status,
        );
      } else {
        throw new HttpException(
          { statusCode: 500, message: err },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async updateCollection(
    collectionId: number,
    collectionData: UpsertCollectionDto,
  ): Promise<void> {
    try {
      const bgColor: BgColor = await this.bgColorRepository.findOne({
        where: { id: collectionData.bgColorId },
      });

      await this.collectionRepository.update(
        { id: collectionId },
        {
          name: collectionData.name,
          description: collectionData.description,
          bgColor: bgColor,
        },
      );
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteCollection(collectionId: number): Promise<void> {
    try {
      await this.collectionRepository.delete({ id: collectionId });
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addNamecardToCollections(
    userId: number,
    addNameCardToCollectionsData: AddNamecardToCollectionsDto,
    namecardUniqueCode: string,
  ): Promise<number[]> {
    try {
      const user: User = await this.userRepository.findOne({ id: userId });
      const namecardToAdded: NameCard = await this.namecardRepository.findOne({
        where: { uniqueCode: namecardUniqueCode },
      });

      const defaultCollection: CollectionNameCard =
        this.collectionNameCardRepository.create({
          user: user,
          nameCard: namecardToAdded,
          collection: null,
        });
      await this.collectionNameCardRepository.save(defaultCollection);

      return await Promise.all(
        addNameCardToCollectionsData.collectionIds.map((collectionId: number) =>
          this._saveNamecardToCollections(
            user,
            namecardToAdded,
            collectionId,
          ).then((res) => res.id),
        ),
      );
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async _saveNamecardToCollections(
    user: User,
    namecardToAdded: NameCard,
    collectionId: number,
  ): Promise<CollectionNameCard> {
    try {
      const collection: Collection = await this.collectionRepository.findOne({
        id: collectionId,
      });
      const collectionNamecard: CollectionNameCard =
        this.collectionNameCardRepository.create({
          collection: collection,
          user: user,
          nameCard: namecardToAdded,
        });
      return await this.collectionNameCardRepository.save(collectionNamecard);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addNamecardsToCollection(
    userId: number,
    collectionId: number,
    addNamecardsToCollectionData: AddAndRemoveNamecardsDto,
  ): Promise<number[]> {
    try {
      const user: User = await this.userRepository.findOne({ id: userId });
      const collectionToAdd: Collection =
        await this.collectionRepository.findOne({ id: collectionId });

      return await Promise.all(
        addNamecardsToCollectionData.namecardIds.map((namecardId: number) =>
          this._saveNamecardsToCollection(
            user,
            collectionToAdd,
            namecardId,
          ).then((res) => res.id),
        ),
      );
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async _saveNamecardsToCollection(
    user: User,
    collectionToAdd: Collection,
    namecardId: number,
  ): Promise<CollectionNameCard> {
    try {
      const namecard: NameCard = await this.namecardRepository.findOne({
        where: { id: namecardId },
      });
      const collectionNamecard: CollectionNameCard =
        this.collectionNameCardRepository.create({
          collection: collectionToAdd,
          user: user,
          nameCard: namecard,
        });
      return await this.collectionNameCardRepository.save(collectionNamecard);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllNamecards(userId: number): Promise<ParticularNameCardSchema[]> {
    try {
      const getNamecardFromCollectionNamecards: NameCard[] =
        await getConnection()
          .createQueryBuilder()
          .select()
          .from(CollectionNameCard, 'collectionNamecard')
          .leftJoinAndSelect('collectionNamecard.nameCard', '')
          .where('collectionNamecard.userId = :userId', {
            userId: userId,
          })
          .groupBy('nameCardId')
          .execute();

      return await Promise.all(
        getNamecardFromCollectionNamecards.map((namecard) =>
          this.namecardService
            .getNamecardByUniqueCode(userId, namecard.uniqueCode)
            .then((res) => res),
        ),
      );
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getNamecardsFromCollection(
    userId: number,
    collectionId: number,
  ): Promise<ParticularNameCardSchema[]> {
    try {
      const namecardsFromCollectionNamecard: NameCard[] = await getConnection()
        .createQueryBuilder()
        .select()
        .from(CollectionNameCard, 'collectionNamecard')
        .leftJoinAndSelect('collectionNamecard.nameCard', '')
        .where('collectionNamecard.collectionId = :collectionId', {
          collectionId: collectionId,
        })
        .execute();

      return await Promise.all(
        namecardsFromCollectionNamecard.map(
          async (namecard) =>
            await this.namecardService
              .getNamecardByUniqueCode(userId, namecard.uniqueCode)
              .then((res) => res),
        ),
      );
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteNamecardFromAllCollection(
    userId: number,
    removeNamecardsFromCollectionDto: AddAndRemoveNamecardsDto,
  ): Promise<void> {
    try {
      await Promise.all(
        removeNamecardsFromCollectionDto.namecardIds.map(
          async (namecardId) =>
            await getConnection()
              .createQueryBuilder()
              .delete()
              .from(CollectionNameCard)
              .where('userId = :userId and namecardId = :namecardId', {
                userId: userId,
                namecardId: namecardId,
              })
              .execute(),
        ),
      );
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteNamecardFromCollection(
    collectionId: number,
    removeNamecardsFromCollectionDto: AddAndRemoveNamecardsDto,
  ): Promise<void> {
    try {
      await Promise.all(
        removeNamecardsFromCollectionDto.namecardIds.map(
          async (namecardId) =>
            await getConnection()
              .createQueryBuilder()
              .delete()
              .from(CollectionNameCard)
              .where(
                'collectionId = :collectionId and namecardId = :namecardId',
                {
                  collectionId: collectionId,
                  namecardId: namecardId,
                },
              )
              .execute(),
        ),
      );
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
