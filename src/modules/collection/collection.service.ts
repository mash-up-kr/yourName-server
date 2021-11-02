import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionNameCard } from 'src/entities/collection-name-card.entity';
import { Collection } from 'src/entities/collection.entity';
import { NameCard } from 'src/entities/name-card.entity';
import { User } from 'src/entities/user.entity';
import { getConnection, Repository } from 'typeorm';
import { AddNamecardToCollectionsDto } from './dto/add-namecard-to-collections.dto';
import { AddAndRemoveNamecardsDto } from './dto/add-and-remove-namecards.dto';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { BgColor } from 'src/entities/bg-color.entity';

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
  ) {}

  async getCollections(userId: number): Promise<Collection[]> {
    try {
      const collections: Collection[] = await this.collectionRepository.find({
        select: ['id', 'name', 'description', 'bgColor'],
        where: { userId: userId },
        relations: ['bgColor'],
      });

      return collections;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createCollection(
    userId: number,
    collectionData: CreateCollectionDto,
  ): Promise<Collection> {
    try {
      const user: User = await this.userRepository.findOne({
        where: { id: userId },
      });
      const bgColor: BgColor = await this._saveBgColor(collectionData);

      const collection: Collection = this.collectionRepository.create({
        user: user,
        name: collectionData.name,
        description: collectionData.description,
        bgColor: bgColor,
      });

      return await this.collectionRepository.save(collection);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async _saveBgColor(collectionData: CreateCollectionDto): Promise<BgColor> {
    try {
      const bgColor: BgColor = this.bgColorRepository.create({
        color1: collectionData.bgcolor.color1,
        color2: collectionData.bgcolor.color2,
        color3: collectionData.bgcolor.color3,
      });

      return await this.bgColorRepository.save(bgColor);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateCollection(
    collectionId: number,
    collectionData: CreateCollectionDto,
  ): Promise<void> {
    try {
      const collection: Collection = await this.collectionRepository.findOne({
        id: collectionId,
      });
      const bgColor: BgColor = await this._updateBgColor(
        collection.bgColorId,
        collectionData,
      );

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

  async _updateBgColor(
    bgColorId: number,
    collectionData: CreateCollectionDto,
  ): Promise<BgColor> {
    try {
      await this.bgColorRepository.update(
        { id: bgColorId },
        {
          color1: collectionData.bgcolor.color1,
          color2: collectionData.bgcolor.color2,
          color3: collectionData.bgcolor.color3,
        },
      );

      return await this.bgColorRepository.findOne({ id: bgColorId });
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

  async getNamecardByUniqueCode(uniqueCode: string): Promise<NameCard> {
    try {
      const namecardToFind: NameCard = await this.namecardRepository.findOne({
        where: { uniqueCode: uniqueCode },
        relations: [
          'user',
          'contacts',
          'contacts.contact',
          'bgColor',
          'tmis',
          'personalSkills',
        ],
      });
      if (!namecardToFind) {
        throw new HttpException(
          'Wrong NameCard Unique Code',
          HttpStatus.NOT_FOUND,
        );
      }

      return namecardToFind;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async isAddedNameCard(userId: number, namecard: NameCard): Promise<boolean> {
    try {
      const isNamecardAdded: CollectionNameCard = await getConnection()
        .createQueryBuilder()
        .select('collectionNamecard')
        .from(CollectionNameCard, 'collectionNamecard')
        .where(
          'collectionNamecard.userId = :userId and collectionNamecard.nameCardId = :nameCardId',
          {
            userId: userId,
            nameCardId: namecard.id,
          },
        )
        .getOne();

      if (isNamecardAdded) {
        return true;
      }
      return false;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addNamecardToCollections(
    userId: number,
    addNameCardToCollectionsData: AddNamecardToCollectionsDto,
    namecardUniqueCode: string,
  ): Promise<CollectionNameCard[]> {
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

      return Promise.all(
        addNameCardToCollectionsData.collectionIds.map((collectionId: number) =>
          this._saveNamecardToCollections(
            user,
            namecardToAdded,
            collectionId,
          ).then((res) => res),
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
  ): Promise<CollectionNameCard[]> {
    try {
      const user: User = await this.userRepository.findOne({ id: userId });
      const collectionToAdd: Collection =
        await this.collectionRepository.findOne({ id: collectionId });

      return Promise.all(
        addNamecardsToCollectionData.namecardIds.map((namecardId: number) =>
          this._saveNamecardsToCollection(
            user,
            collectionToAdd,
            namecardId,
          ).then((res) => res),
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

  async getAllNamecards(userId: number): Promise<NameCard[]> {
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

      return Promise.all(
        getNamecardFromCollectionNamecards.map((namecard) =>
          this.getNamecardByUniqueCode(namecard.uniqueCode).then((res) => res),
        ),
      );
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getNamecardsFromCollection(collectionId: number): Promise<NameCard[]> {
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

      return Promise.all(
        namecardsFromCollectionNamecard.map(
          async (namecard) =>
            await this.getNamecardByUniqueCode(namecard.uniqueCode).then(
              (res) => res,
            ),
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
      Promise.all(
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
      Promise.all(
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
