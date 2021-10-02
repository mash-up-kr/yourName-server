import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact.entity';
import { NameCardBgColor } from 'src/entities/name-card-bg-color.entity';
import { NameCardContact } from 'src/entities/name-card-contact.entity';
import { NameCardTmi } from 'src/entities/name-card-tmi.entity';
import { NameCard } from 'src/entities/name-card.entity';
import { PersonalSkill } from 'src/entities/personal-skill.entity';
import { Skill } from 'src/entities/skill.entity';
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
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
    @InjectRepository(PersonalSkill)
    private personalSkillRepository: Repository<PersonalSkill>,
  ) {}

  async getMyNameCards(userId: number) {
    return await this.nameCardRepository.find({
      where: { userId },
      relations: ['user', 'contacts', 'bgColors', 'tmis', 'personalSkills'],
    });
  }

  //@todo: Transaction 처리
  async createNameCard(
    createNameCardDto: CreateNameCardDto,
  ): Promise<NameCard> {
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
      skills,
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

        if (!_contact) {
          throw '존재하지 않는 Contact Category';
        }
        await this.nameContactRepository.save({
          value: contact.value,
          order: i,
          nameCardId: nameCard.id,
          contactId: _contact.id,
        });
      }),
    );

    await Promise.all(
      tmiIds.map(async (tmiId) => {
        const tmi = await this.tmiRepository.findOne(tmiId);

        if (!tmi) {
          throw '존재하지 않는 TMI 유형입니다';
        }
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

    await Promise.all(
      skills.map(async (skill, i) => {
        let _skill = await this.skillRepository.findOne({ name: skill.name });

        if (!_skill) {
          _skill = await this.skillRepository.save({ name: skill.name });
        }

        await this.personalSkillRepository.save({
          namecardId: nameCard.id,
          skiilId: _skill.id,
          level: skill.level,
        });
      }),
    );

    return await this.nameCardRepository.findOne(nameCard.id, {
      relations: ['user', 'contacts', 'bgColors', 'tmis', 'personalSkills'],
    });
  }
}
