import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  CollectionSchame,
  ContactSchema,
  ImageSchema,
  NameCardSchema,
  PersonalSkillSchema,
  TmiSchema,
} from 'src/interfaces/collection.interface';

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

  async getCollections(userId: number): Promise<CollectionSchame[]> {
    try {
      const collections: Collection[] = await this.collectionRepository.find({
        where: { userId: userId },
        relations: ['bgColor'],
      });
      const formattedCollections: CollectionSchame[] =
        this._formattingCollectionRes(collections);

      return formattedCollections;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  _formattingCollectionRes(collections: Collection[]): CollectionSchame[] {
    const formattedCollections: CollectionSchame[] = collections.map(
      (collection) => {
        return {
          id: collection.id,
          name: collection.name,
          description: collection.description,
          bgColor: this._formattingCollectionBgColor(collection),
        };
      },
    );

    return formattedCollections;
  }

  _formattingCollectionBgColor(collection: Collection): BgColorSchema {
    const value = [
      ...Object.keys(collection.bgColor)
        .filter((key) => key.includes('color'))
        .map((color) => collection.bgColor[color]),
    ].filter((value) => value);

    return { id: collection.bgColorId, value: value };
  }

  async createCollection(
    userId: number,
    collectionData: UpsertCollectionDto,
  ): Promise<Collection> {
    try {
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

      return await this.collectionRepository.save(collection);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
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

  async getNamecardByUniqueCode(uniqueCode: string): Promise<NameCardSchema> {
    try {
      const namecardToFind: NameCard = await this.namecardRepository.findOne({
        where: { uniqueCode: uniqueCode },
        relations: [
          'image',
          'user',
          'contacts',
          'contacts.contact',
          'bgColor',
          'tmis',
          'tmis.tmi',
          'personalSkills',
          'personalSkills.skill',
        ],
      });

      const image = this._formattingImage(namecardToFind);
      const bgColor = this._formattingNamecardBgColor(namecardToFind);
      const contact = this._formattingContact(namecardToFind);
      const tmi = this._formattingTmi(namecardToFind);
      const personalSkill = this._formattingPersonalSkill(namecardToFind);

      return {
        id: namecardToFind.id,
        name: namecardToFind.name,
        role: namecardToFind.role,
        personality: namecardToFind.personality,
        introduce: namecardToFind.introduce,
        uniqueCode: namecardToFind.uniqueCode,
        image,
        user: namecardToFind.user,
        bgColor,
        contact,
        tmi,
        personalSkill,
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async isAddedNameCard(
    userId: number,
    namecard: NameCardSchema,
  ): Promise<boolean> {
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

      return Promise.all(
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

      return Promise.all(
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

  async getAllNamecards(userId: number): Promise<NameCardSchema[]> {
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

  async getNamecardsFromCollection(
    collectionId: number,
  ): Promise<NameCardSchema[]> {
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

  _formattingImage(nameCard: NameCard): ImageSchema {
    return {
      imgKey: nameCard.image.key,
    };
  }

  _formattingNamecardBgColor(nameCard: NameCard): BgColorSchema {
    const value = [
      ...Object.keys(nameCard.bgColor)
        .filter((key) => key.includes('color'))
        .map((color) => nameCard.bgColor[color]),
    ].filter((value) => value);

    return {
      id: nameCard.bgColor.id,
      value,
    };
  }

  _formattingContact(nameCard: NameCard): ContactSchema[] {
    const contacts = nameCard.contacts.map((contact) => {
      return {
        category: contact.contact.category,
        value: contact.value,
        iconUrl: contact.contact.iconUrl,
      };
    });

    return contacts;
  }

  _formattingTmi(nameCard: NameCard): TmiSchema[] {
    const tmis = nameCard.tmis.map((tmi) => {
      return {
        type: tmi.tmi.type,
        name: tmi.tmi.name,
      };
    });

    return tmis;
  }

  _formattingPersonalSkill(nameCard: NameCard): PersonalSkillSchema[] {
    const personalSkills = nameCard.personalSkills.map((personalSkill) => {
      return {
        name: personalSkill.skill.name,
        level: personalSkill.level,
      };
    });
    return personalSkills;
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
