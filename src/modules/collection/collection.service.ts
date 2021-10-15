import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionNameCard } from 'src/entities/collection-name-card.entity';
import { Collection } from 'src/entities/collection.entity';
import { NameCard } from 'src/entities/name-card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,

    @InjectRepository(CollectionNameCard)
    private readonly collectionNameCardRepository: Repository<CollectionNameCard>,

    @InjectRepository(NameCard)
    private readonly namecardRepository: Repository<NameCard>,
  ) {}

  async getCollection(userId: number): Promise<CollectionNameCard[]> {
    const collection: Collection = await this.collectionRepository.findOne({
      where: { userId: userId },
    });

    return await this.collectionNameCardRepository.find({
      select: ['nameCard'],
      where: { collectionId: collection.id },
      relations: ['nameCard'],
    });
  }

  async getNamecardByUniqueCode(uniqueCode: string): Promise<NameCard> {
    const namecardToFind: NameCard = await this.namecardRepository.findOne({
      where: { uniqueCode: uniqueCode },
    });

    if (!namecardToFind)
      throw new HttpException('Wrong UniqueCode', HttpStatus.BAD_REQUEST);

    return namecardToFind;
  }

  async addNamecardToCollection(
    userId: number,
    namecardUniqueCode: string,
  ): Promise<CollectionNameCard> {
    const namecardToAdd: NameCard = await this.namecardRepository.findOne({
      where: { uniqueCode: namecardUniqueCode },
    });
    if (!namecardToAdd)
      throw new HttpException('Wrong UniqueCode', HttpStatus.BAD_REQUEST);

    const collectionToAdded: Collection =
      await this.collectionRepository.findOne({
        where: { userId: userId },
      });

    const collectionNamecard: CollectionNameCard =
      this.collectionNameCardRepository.create({
        nameCard: namecardToAdd,
        collection: collectionToAdded,
      });
    const isExistNamecardInCollection: CollectionNameCard =
      await this.collectionNameCardRepository.findOne(collectionNamecard);
    if (isExistNamecardInCollection)
      throw new HttpException('Duplicated Namecard', HttpStatus.BAD_REQUEST);

    return await this.collectionNameCardRepository.save(collectionNamecard);
  }

  async deleteNamecardFromCollection(
    userId: number,
    namecardUniqueCode: string,
  ): Promise<void> {
    try {
      const collection: Collection = await this.collectionRepository.findOne({
        where: { userId: userId },
      });

      const namecard: NameCard = await this.namecardRepository.findOne({
        where: { uniqueCode: namecardUniqueCode },
      });

      await this.collectionNameCardRepository.delete({
        collectionId: collection.id,
        nameCardId: namecard.id,
      });
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
