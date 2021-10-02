import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact.entity';
import { NameCardBgColor } from 'src/entities/name-card-bg-color.entity';
import { NameCardContact } from 'src/entities/name-card-contact.entity';
import { NameCardTmi } from 'src/entities/name-card-tmi.entity';
import { NameCard } from 'src/entities/name-card.entity';
import { Tmi } from 'src/entities/tmi.entity';
import { Repository } from 'typeorm';
import { CreateNameCardDto } from './dto/create-name-card.dto';

@Injectable()
export class NameCardService {
  constructor(
    @InjectRepository(NameCard)
    private nameCardRepository: Repository<NameCard>,
    @InjectRepository(NameCardContact)
    private nameContactRepository: Repository<NameCardContact>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    @InjectRepository(NameCardTmi)
    private nameCardTmiRepository: Repository<NameCardTmi>,
    @InjectRepository(Tmi)
    private tmiRepository: Repository<Tmi>,
    @InjectRepository(NameCardBgColor)
    private nameCardBgColorRepository: Repository<NameCardBgColor>,
  ) {}

  async createNameCard(createNameCardDto: CreateNameCardDto) {
    const {
      imageUrl,
      name,
      role,
      introduce,
      userId,
      personality,
      contacts,
      tmiIds,
      bgColors,
    } = createNameCardDto;

    //@todo: UniqueCode 코드

    const nameCard = await this.nameCardRepository.save({
      name,
      role,
      introduce,
      userId,
      personality,
      imageUrl,
    });

    await Promise.all(
      contacts.map(async (contact, i) => {
        const _contact = await this.contactRepository.findOne({
          category: contact.category,
        });

        await this.nameContactRepository.save({
          value: contact.value,
          order: i,
          nameCardId: nameCard.id,
          contactId: _contact.id,
        });
      }),
    );

    const tmis: Tmi[] = await Promise.all(
      tmiIds.map(async (tmiId) => {
        return await this.tmiRepository.findOne(tmiId);
      }),
    );

    await Promise.all(
      tmis.map(async (tmi) => {
        await this.nameCardTmiRepository.save({
          nameCardId: nameCard.id,
          tmiId: tmi.id,
        });
      }),
    );

    await Promise.all(
      tmis.map(async (tmi) => {
        await this.nameCardTmiRepository.save({
          nameCardId: nameCard.id,
          tmiId: tmi.id,
        });
      }),
    );

    await Promise.all(
      bgColors.map(async (bgColor, i) => {
        await this.nameCardBgColorRepository.save({
          nameCardId: nameCard.id,
          hexCode: bgColor,
          order: i,
        });
      }),
    );
  }
}
